import { createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle,
  Camera,
  Check,
  Clock,
  Copy,
  Eye,
  EyeOff,
  FileText,
  Globe,
  LogOut,
  Lock,
  Mail,
  Phone,
  Smartphone,
  Trash2,
  User,
  Zap,
  Download,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { PageShell } from "@/components/PageShell";
import { recordAnalyticsEvent } from "@/components/AnalyticsTracker";
import { absoluteUrl } from "@/lib/seo";

type ActiveTab = "overview" | "security" | "preferences" | "sessions";

interface Profile {
  name: string;
  email: string;
  phone: string;
  newsletter: boolean;
  photo: string;
}

interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  isCurrentSession: boolean;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  passwordLastChanged: string;
  loginAttempts: number;
}

const PROFILE_KEY = "nova-bill-profile";
const NEWSLETTER_KEY = "nova-bill-newsletter";
const EMPTY_PROFILE: Profile = { name: "", email: "", phone: "", newsletter: true, photo: "" };

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — BLL do Brasil" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { name: "description", content: "Gerencie sua conta e preferências de segurança." },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/perfil") }],
  }),
  component: Perfil,
});

function Perfil() {
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [hasAccount, setHasAccount] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(PROFILE_KEY);
    if (stored) {
      setProfile({ ...EMPTY_PROFILE, ...(JSON.parse(stored) as Partial<Profile>) });
      setHasAccount(true);
      loadSessions();
    }
  }, []);

  function loadSessions() {
    const mockSessions: Session[] = [
      {
        id: "current",
        device: "Seu navegador",
        browser: "Chrome no Windows",
        location: "São Paulo, SP",
        lastActive: new Date().toLocaleString(),
        isCurrentSession: true,
      },
      {
        id: "session-2",
        device: "iPhone",
        browser: "Safari no iOS",
        location: "São Paulo, SP",
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString(),
        isCurrentSession: false,
      },
    ];
    setSessions(mockSessions);
  }

  function saveProfile(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      const profiles = JSON.parse(localStorage.getItem("nova-bill-profiles") || "[]") as Profile[];
      localStorage.setItem("nova-bill-profiles", JSON.stringify([...profiles.filter((item) => item.email !== profile.email), profile]));

      recordAnalyticsEvent("profile", hasAccount ? "Perfil atualizado" : "Conta criada", {
        name: profile.name,
        email: profile.email,
      });

      setHasAccount(true);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError("Erro ao salvar perfil");
    } finally {
      setLoading(false);
    }
  }

  function handlePhoto(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfile((current) => ({ ...current, photo: String(reader.result) }));
    reader.readAsDataURL(file);
  }

  function deleteAccount() {
    if (!window.confirm("Tem certeza? Esta ação não pode ser desfeita.")) return;

    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem("nova-bill-profiles");
    localStorage.removeItem(NEWSLETTER_KEY);
    recordAnalyticsEvent("profile", "Conta excluída");

    setProfile(EMPTY_PROFILE);
    setHasAccount(false);
    setActiveTab("overview");
  }

  function handleSessionLogout(sessionId: string) {
    setSessions(sessions.filter((s) => s.id !== sessionId));
  }

  if (!hasAccount) {
    return (
      <PageShell eyebrow="Conta" title={<>Crie sua <span className="text-gradient-yellow">conta.</span></>} description="Gerencie suas informações, segurança e preferências em um único lugar.">
        <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
          <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-8 sm:p-12 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-yellow/20">
              <User className="text-brand-yellow" size={32} />
            </div>
            <h2 className="mt-6 text-2xl font-black text-white">Sem conta ativa</h2>
            <p className="mt-3 text-slate-400">Crie sua conta para acompanhar relacionamento com a Nova Bll.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center">
              <a href="/cadastro" className="btn-hero">
                Criar conta
              </a>
              <a href="/" className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-6 py-3 font-bold text-slate-300 hover:bg-slate-700">
                Voltar
              </a>
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell eyebrow="Sua conta" title={<>Olá, <span className="text-gradient-yellow">{profile.name.split(" ")[0]}</span></>} description="Gerencie suas informações pessoais, segurança e preferências.">
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Profile Header Card */}
        <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-10 mb-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              {/* Avatar */}
              <label className="group relative grid h-32 w-32 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-2xl border-4 border-brand-yellow bg-slate-900 text-white shadow-xl shadow-brand-yellow/20">
                {profile.photo ? <img src={profile.photo} alt="Foto" className="h-full w-full object-cover" /> : <User size={48} />}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <Camera size={28} />
                </div>
                <input type="file" accept="image/*" className="sr-only" onChange={(e) => handlePhoto(e.target.files?.[0])} />
              </label>

              {/* Info */}
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-yellow">Conta ativa</p>
                <h2 className="mt-2 text-3xl font-black text-white">{profile.name}</h2>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-400">
                  <Mail size={16} className="text-brand-yellow" />
                  {profile.email}
                </p>
                {profile.phone && (
                  <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-400">
                    <Phone size={16} className="text-brand-yellow" />
                    {profile.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button onClick={() => setActiveTab("security")} className="group flex items-center gap-2 rounded-lg border border-brand-yellow/30 bg-brand-yellow/10 px-4 py-3 text-sm font-bold text-brand-yellow transition-all hover:border-brand-yellow/60 hover:bg-brand-yellow/20">
                <Lock size={16} />
                Segurança
              </button>
              <button onClick={deleteAccount} className="grid h-11 w-11 place-items-center rounded-lg border border-red-500/30 bg-red-500/10 text-red-500 transition-colors hover:bg-red-500/20" title="Deletar conta">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-slate-700">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: "overview", label: "Visão geral", icon: User },
              { id: "security", label: "Segurança", icon: Lock },
              { id: "preferences", label: "Preferências", icon: Zap },
              { id: "sessions", label: "Sessões", icon: Smartphone },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as ActiveTab)}
                className={`flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-black uppercase transition-colors whitespace-nowrap ${
                  activeTab === id ? "border-brand-yellow text-brand-yellow" : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <form onSubmit={saveProfile} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-300">
                    <User size={14} />
                    Nome
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-300">
                    <Mail size={14} />
                    Email
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-300">
                    <Phone size={14} />
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-300">
                    <Globe size={14} />
                    Status da conta
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3">
                    <Check className="text-green-500" size={18} />
                    <span className="font-bold text-white">Verificado</span>
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-3 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                <input type="checkbox" checked={profile.newsletter} onChange={(e) => setProfile({ ...profile, newsletter: e.target.checked })} className="mt-1 h-4 w-4 accent-brand-yellow" />
                <p className="text-sm font-semibold text-slate-400">
                  Receber novidades, dicas e oportunidades da Nova Bll do Brasil por email.
                </p>
              </label>

              {error && (
                <div className="flex items-start gap-3 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
                  <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-bold text-red-500">{error}</p>
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-hero w-full">
                {saved ? <><Check size={18} /> Salvo com sucesso</> : loading ? "Salvando..." : "Salvar alterações"}
              </button>
            </form>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              {/* 2FA Card */}
              <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-black text-white">
                      <Smartphone size={20} className="text-brand-yellow" />
                      Autenticação em duas etapas
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">Adicione uma camada extra de segurança à sua conta.</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-slate-700 px-3 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="text-xs font-bold text-slate-300">Inativo</span>
                  </div>
                </div>
                <button className="mt-6 inline-flex items-center gap-2 rounded-lg border border-brand-yellow/50 bg-brand-yellow/10 px-4 py-2 text-sm font-bold text-brand-yellow hover:bg-brand-yellow/20">
                  <Lock size={16} />
                  Ativar 2FA
                </button>
              </div>

              {/* Password Card */}
              <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
                <h3 className="flex items-center gap-2 text-lg font-black text-white">
                  <Lock size={20} className="text-brand-yellow" />
                  Mudar senha
                </h3>
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Senha atual</label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 pr-12 text-white focus:border-brand-yellow focus:outline-none" placeholder="••••••••" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
                        {showPassword ? <EyeOff size={18} className="text-slate-400" /> : <Eye size={18} className="text-slate-400" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400">Nova senha</label>
                      <input type="password" className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400">Confirmar</label>
                      <input type="password" className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none" placeholder="••••••••" />
                    </div>
                  </div>

                  <button className="btn-hero">Atualizar senha</button>
                </div>
              </div>

              {/* Security Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                  <p className="text-xs font-bold uppercase text-slate-400">Última alteração de senha</p>
                  <p className="mt-2 text-lg font-black text-white">Há 30 dias</p>
                </div>
                <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                  <p className="text-xs font-bold uppercase text-slate-400">Tentativas de login</p>
                  <p className="mt-2 text-lg font-black text-white">Nenhuma suspeita</p>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
                <h3 className="text-lg font-black text-white">Notificações por email</h3>
                <div className="mt-6 space-y-4">
                  {[
                    { label: "Novidades e atualizações", active: true },
                    { label: "Ofertas e promoções", active: true },
                    { label: "Relatórios semanais", active: false },
                    { label: "Confirmação de pedidos", active: true },
                  ].map((item, i) => (
                    <label key={i} className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked={item.active} className="h-4 w-4 accent-brand-yellow" />
                      <span className="text-sm font-semibold text-slate-300">{item.label}</span>
                    </label>
                  ))}
                </div>
                <button className="btn-hero mt-6">Salvar preferências</button>
              </div>
            </div>
          )}

          {/* Sessions Tab */}
          {activeTab === "sessions" && (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-lg bg-slate-700">
                        <Smartphone size={20} className="text-brand-yellow" />
                      </div>
                      <div>
                        <p className="font-bold text-white">{session.device}</p>
                        <p className="text-xs text-slate-400">{session.browser}</p>
                        <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                          <Globe size={12} />
                          {session.location}
                        </p>
                        <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                          <Clock size={12} />
                          Ativo: {session.lastActive}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {session.isCurrentSession ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-xs font-bold text-green-500">
                          <Check size={12} />
                          Sessão atual
                        </span>
                      ) : (
                        <button onClick={() => handleSessionLogout(session.id)} className="text-xs font-bold text-red-500 hover:text-red-400">
                          Desconectar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Data Export */}
        <div className="mt-12 rounded-lg border border-slate-700 bg-slate-800/50 p-6">
          <h3 className="flex items-center gap-2 text-lg font-black text-white">
            <Download size={20} className="text-brand-yellow" />
            Dados da sua conta
          </h3>
          <p className="mt-2 text-sm text-slate-400">Baixe uma cópia de todos seus dados pessoais em formato JSON.</p>
          <button className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-sm font-bold text-slate-300 hover:bg-slate-800">
            <Download size={16} />
            Exportar dados
          </button>
        </div>
      </section>
    </PageShell>
  );
}