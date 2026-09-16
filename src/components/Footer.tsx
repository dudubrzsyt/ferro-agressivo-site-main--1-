import { Link } from "@tanstack/react-router";
import { Building2, Facebook, FileText, Instagram, Mail, MapPin, Phone } from "lucide-react";
import logoImg from "@/assets/logo.jpeg";
import { PHONE_NUMBER } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="site-footer relative mx-0 mt-24 overflow-hidden rounded-t-[2rem] border border-b-0 border-white/15 bg-[linear-gradient(135deg,var(--color-dark-gray)_0%,var(--color-matte-black)_55%,var(--color-black)_100%)] text-white sm:mt-24 shadow-deep">
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-brand-yellow to-transparent" />
      <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full border border-white/10 bg-white/5 blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-5 pb-4 pt-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 border-b border-white/15 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={logoImg}
              alt="Logo Nova Bll do Brasil"
              className="h-14 w-14 rounded-xl border border-white/20 object-cover shadow-deep ring-2 ring-brand-yellow/50"
            />
            <div>
              <p className="text-lg font-black uppercase tracking-[0.2em] text-brand-yellow">Nova Bll do Brasil</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.28em] text-white/75">Ferro &amp; Aço</p>
              <p className="mt-2 max-w-md text-xs font-semibold leading-relaxed text-white/65">
                Força, precisão e entrega para construções que não admitem falha.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <SocialBtn href="https://www.instagram.com/novablldobrasil/?hl=en" label="Instagram"><Instagram size={18} /></SocialBtn>
            <SocialBtn href="https://facebook.com" label="Facebook"><Facebook size={18} /></SocialBtn>
            <SocialBtn href="mailto:vendas@blldobrasil.com.br" label="Email"><Mail size={18} /></SocialBtn>
          </div>
        </div>

        <div className="grid gap-5 py-5 sm:grid-cols-2 lg:grid-cols-[0.8fr_1fr_1.2fr]">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-brand-yellow">Navegação</p>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-2 text-xs font-bold text-white/80 sm:grid-cols-3 lg:grid-cols-2">
              <li><Link to="/" className="transition-colors duration-200 hover:text-brand-yellow">Início</Link></li>
              <li><Link to="/produtos" className="transition-colors duration-200 hover:text-brand-yellow">Produtos</Link></li>
              <li><Link to="/servicos" className="transition-colors duration-200 hover:text-brand-yellow">Serviços</Link></li>
              <li><Link to="/corte-e-dobra" className="transition-colors duration-200 hover:text-brand-yellow">Corte e dobra</Link></li>
              <li><Link to="/armaduras-prontas" className="transition-colors duration-200 hover:text-brand-yellow">Armaduras prontas</Link></li>
              <li><Link to="/solucoes-para-construtoras" className="transition-colors duration-200 hover:text-brand-yellow">Para construtoras</Link></li>
              <li><Link to="/vergalhao-ca-50" className="transition-colors duration-200 hover:text-brand-yellow">Vergalhão CA-50</Link></li>
              <li><Link to="/entrega-de-aco" className="transition-colors duration-200 hover:text-brand-yellow">Entrega de aço</Link></li>
              <li><Link to="/consultoria-tecnica" className="transition-colors duration-200 hover:text-brand-yellow">Consultoria técnica</Link></li>
              <li><Link to="/orcamento-de-aco" className="transition-colors duration-200 hover:text-brand-yellow">Orçamento de aço</Link></li>
              <li><Link to="/sobre" className="transition-colors duration-200 hover:text-brand-yellow">Sobre a empresa</Link></li>
              <li><Link to="/contato" className="transition-colors duration-200 hover:text-brand-yellow">Fale conosco</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-brand-yellow">Empresa</p>
            <ul className="space-y-2 text-xs font-semibold text-white/75">
              <li className="flex items-start gap-3"><Building2 size={17} className="mt-0.5 shrink-0 text-brand-yellow" /><span>Nova Bll do Brasil Comércio de Ferro e Aço Ltda.</span></li>
              <li className="flex items-start gap-3"><FileText size={17} className="mt-0.5 shrink-0 text-brand-yellow" /><span>CNPJ: 30.000.521/0001-00</span></li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Av.+Das+Na%C3%A7%C3%B5es+Unidas%2C+20925%2C+S%C3%A3o+Paulo%2C+SP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-brand-yellow"
                >
                  <MapPin size={17} className="mt-0.5 shrink-0 text-brand-yellow" />
                  <span>Av. Das Nações Unidas, 20925 Jurubatuba, São Paulo - SP, 04795-100<br />Próximo ao Shopping SP Market<br />São Paulo, SP</span>
                </a>
              </li>
              <li className="flex items-start gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-brand-yellow" /><span>Atendemos todo o Brasil, com presença em São Paulo</span></li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-brand-yellow">Atendimento</p>
            <ul className="space-y-2 text-xs font-semibold text-white/75">
              <li><a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-3 transition-colors hover:text-brand-yellow"><Phone size={17} className="shrink-0 text-brand-yellow" /><span>(11) 5522-9775</span></a></li>
              <li><a href="https://wa.me/5511992179989" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-brand-yellow"><Phone size={17} className="shrink-0 text-brand-yellow" /><span>(11) 99217-9989 - WhatsApp</span></a></li>
              <li><a href="mailto:vendas@blldobrasil.com.be" className="flex items-center gap-3 transition-colors hover:text-brand-yellow"><Mail size={17} className="shrink-0 text-brand-yellow" /><span>vendas@blldobrasil.com.br</span></a></li>
            </ul>
            <Link to="/contato" className="mt-4 inline-flex rounded-full border border-brand-yellow/70 bg-brand-yellow px-4 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-black transition-transform hover:-translate-y-0.5">
              Solicitar orçamento
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-white/60 sm:px-8 md:flex-row md:text-left lg:px-10">
          <p>© {new Date().getFullYear()} Nova Bll do Brasil</p>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
            <p>Qualidade que sustenta o futuro.</p>
            <a
              href="https://www.instagram.com/igoreduardo.dev/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-3 py-2 text-[9px] font-black tracking-[0.14em] text-brand-yellow transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-yellow hover:bg-brand-yellow hover:text-black hover:shadow-yellow"
            >
              Design feito por <span className="transition-transform duration-300 group-hover:translate-x-0.5">Igor Eduardo</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialBtn({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-white shadow-deep transition-all duration-300 hover:-translate-y-1 hover:border-brand-yellow/40 hover:bg-brand-yellow/15 hover:text-brand-yellow hover:shadow-deep"
    >
      <span className="transition-transform duration-300 group-hover:scale-110">{children}</span>
    </a>
  );
}
