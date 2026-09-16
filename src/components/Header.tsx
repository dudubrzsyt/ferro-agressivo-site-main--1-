import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, UserRound, X } from "lucide-react";
import logoImg from "@/assets/logo.jpeg";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/produtos", label: "Produtos" },
  { to: "/servicos", label: "Serviços" },
  { to: "/corte-e-dobra", label: "Corte e dobra" },
  { to: "/armaduras-prontas", label: "Armaduras prontas" },
  { to: "/solucoes-para-construtoras", label: "Para construtoras" },
  { to: "/vergalhao-ca-50", label: "Vergalhão CA-50" },
  { to: "/entrega-de-aco", label: "Entrega de aço" },
  { to: "/consultoria-tecnica", label: "Consultoria" },
  { to: "/orcamento-de-aco", label: "Orçamento" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    const profile = localStorage.getItem("nova-bill-profile");
    if (profile) setProfilePhoto((JSON.parse(profile) as { photo?: string }).photo || "");
    const onProfileUpdated = (event: Event) => setProfilePhoto((event as CustomEvent<{ photo?: string }>).detail?.photo || "");
    window.addEventListener("nova-bill-profile-updated", onProfileUpdated);
    return () => window.removeEventListener("nova-bill-profile-updated", onProfileUpdated);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : previousOverflow;
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-2 transition-all duration-300 sm:px-3 md:px-6">
      <div
        className="relative mx-auto flex max-w-7xl items-center justify-between rounded-[1.25rem] border border-white/80 bg-white px-2 py-2 shadow-deep transition-all duration-500 backdrop-blur-2xl"
      >
        <Link to="/" className="relative z-0 flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <LogoMark />
        </Link>

        <nav className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-0.5 px-2 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-brand-yellow text-white shadow-deep" }}
              inactiveProps={{ className: "text-black/80 hover:-translate-y-0.5 hover:bg-white/50 hover:text-brand-yellow" }}
              className="shrink-0 rounded-lg px-2 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap transition-all duration-300 lg:px-2.5"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center justify-end gap-3 md:flex">
          <ProfileButton photo={profilePhoto} />
          <Link
            to="/contato"
            className="rounded-lg border border-brand-yellow bg-brand-yellow px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap text-white shadow-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-yellow/90"
          >
            Orçamento
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-1.5 md:hidden">
          <ProfileButton photo={profilePhoto} mobile />
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/40 bg-white/40 text-black/80 shadow-deep backdrop-blur-md transition-all duration-300 hover:scale-105"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden">
          <div id="mobile-navigation" className="mx-2 mb-4 mt-2 rounded-2xl border border-white/40 bg-white p-3 shadow-deep backdrop-blur-2xl animate-slam">
            <nav className="flex flex-col items-stretch">
              {NAV.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "bg-brand-yellow text-white" }}
                  inactiveProps={{ className: "text-black/80 hover:bg-black/5" }}
                  style={{ animationDelay: `${(i + 1) * 100}ms` }}
                  className="w-full border-b border-black/10 py-2.5 text-center text-sm font-semibold uppercase tracking-[0.14em] last:border-0 animate-slam"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contato"
                onClick={() => setOpen(false)}
                className="mt-3 w-full rounded-lg border border-brand-yellow bg-brand-yellow px-4 py-2 text-center text-sm font-semibold uppercase tracking-[0.16em] whitespace-nowrap text-white shadow-deep transition-all duration-300 hover:bg-brand-yellow/90"
              >
                Solicitar Orçamento
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function ProfileButton({ photo, mobile = false }: { photo: string; mobile?: boolean }) {
  return (
    <Link
      to="/perfil"
      aria-label="Abrir meu perfil"
      title="Meu perfil"
      className={`${mobile ? "md:hidden" : "hidden md:grid"} profile-ring h-10 w-10 place-items-center overflow-hidden rounded-full bg-black text-white transition-transform hover:scale-105`}
    >
      {photo ? <img src={photo} alt="" className="h-full w-full object-cover" /> : <UserRound size={19} />}
    </Link>
  );
}

function LogoMark() {
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-white/40 bg-white/35 p-2 shadow-deep backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]">
      <img
        src={logoImg}
        alt="Nova Bll do Brasil"
        className="h-9 w-9 rounded-lg object-cover ring-1 ring-white/60 sm:h-10 sm:w-10"
      />
      <div className="flex flex-col leading-none">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-yellow drop-shadow-[0_1px_5px_rgba(210,178,76,0.35)] transition-all duration-300 group-hover:tracking-[0.24em] sm:text-xs sm:tracking-[0.3em]">BLL do Brasil</span>
        <span className="hidden text-[10px] font-medium uppercase tracking-[0.24em] text-black/65 transition-colors duration-300 group-hover:text-black/90 sm:block">Ferro &amp; Aço</span>
      </div>
    </div>
  );
}
