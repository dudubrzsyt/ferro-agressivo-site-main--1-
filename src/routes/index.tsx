import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Truck, Hammer, Award, ClipboardCheck, Clock, MessageCircle } from "lucide-react";
import heroImg from "@/assets/hero-steel.jpg";
import productsImg from "@/assets/products-steel.jpg";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nova Bll do Brasil — Força que constrói" },
      { name: "description", content: "Ferro, aço, vergalhões, corte e dobra para obras de todos os portes. Atendimento em todo o Brasil e São Paulo, próximo ao Shopping SP Market." },
      { property: "og:title", content: "Nova Bll do Brasil — Força que constrói" },
      { property: "og:description", content: "Ferro, aço e vergalhões com entrega industrial." },
      { property: "og:url", content: absoluteUrl("/") },
    ],
    links: [
      { rel: "canonical", href: absoluteUrl("/") },
      { rel: "preload", href: heroImg, as: "image", fetchPriority: "high" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <QuoteCta />
      <SolutionsPreview />
      <ProductsTeaser />
    </>
  );
}

function Hero() {
  return (
    <section className="hero-section relative isolate min-h-screen overflow-hidden pt-28 text-white md:pt-32">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Estrutura de aço industrial"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-r from-white/35 via-white/10 to-transparent md:from-white/25 md:via-white/5" />
        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
        <div>
          <p className="hero-white-text inline-flex animate-slam items-center gap-2 rounded-full border border-brand-yellow/60 bg-black/25 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-white shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow animate-pulse-glow" />
              Excelência em ferro e aço · Desde 2006
          </p>

          <h1 className="mt-6 max-w-4xl animate-slam delay-100 text-[14vw] font-black leading-[0.86] tracking-tighter text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.3)] md:text-[6.5rem]">
            <span className="hero-white-text block text-white">NOVA BLL DO BRASIL</span>
            <span className="block text-gradient-yellow">FERRO & AÇO</span>
            <span className="hero-white-text block text-white/80 text-[10vw] md:text-[3rem]">o futuro do Brasil.</span>
          </h1>

          <p className="hero-white-text mt-7 max-w-xl animate-slam delay-200 text-base font-semibold leading-relaxed text-white/90 drop-shadow-sm md:text-lg">
            A BLL do Brasil oferece soluções em corte, dobra e fabricação de estruturas metálicas,
            com qualidade, precisão e prazo para clientes industriais, comerciais, logísticos,
            da construção civil e postos de combustíveis.
          </p>

          <div className="mt-9 flex animate-slam delay-300 flex-wrap gap-3">
            <Link to="/produtos" className="btn-hero btn-hero-hover">
              Ver catálogo <ArrowRight size={18} />
            </Link>
            <Link to="/contato" className="btn-hero-outline btn-hero-hover">
              Solicitar orçamento
            </Link>
          </div>

          <dl className="mt-12 grid max-w-xl animate-slam delay-400 grid-cols-3 gap-2 border-t border-white/25 pt-6 sm:gap-5 sm:pt-8">
            <Stat n="15+" l="anos de mercado" />
            <Stat n="2,5 mil" l="obras atendidas" />
            <Stat n="24h" l="entrega expressa" />
          </dl>
        </div>

        {/* Floating yellow card */}
        <div className="relative hidden animate-slam delay-200 md:block">
          <div className="hero-feature-card glass relative rounded-3xl p-8">
            <div className="absolute -left-3 top-8 h-12 w-1 rounded bg-brand-yellow" />
            <p className="text-xs font-black uppercase tracking-[0.3em] text-brand-yellow">Em destaque</p>
            <h3 className="mt-3 text-3xl font-black leading-tight">Vergalhão CA-50 nervurado</h3>
            <p className="mt-3 text-sm font-bold text-muted-foreground">
                  Consulte bitolas de 5 a 32 mm para retirada ou entrega programada.
            </p>

            <ul className="mt-6 space-y-3 text-sm font-bold">
                  { ["Conforme NBR 7480", "Lote rastreável", "Entrega combinada"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-yellow text-brand-black">✓</span>
                  {t}
                </li>
              ))}
            </ul>

            <Link to="/produtos" className="btn-hero btn-hero-hover mt-7 w-full">
              Ver bitolas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/15 bg-black/20 px-2.5 py-3 backdrop-blur-sm sm:px-4">
      <p className="text-[clamp(1.55rem,6vw,2.5rem)] font-black leading-none text-brand-yellow drop-shadow-sm">{n}</p>
      <p className="mt-2 text-[9px] font-bold uppercase leading-tight tracking-[0.12em] text-white/75 sm:text-[10px] sm:tracking-[0.18em]">{l}</p>
    </div>
  );
}

function Highlights() {
  const items = [
    { i: ShieldCheck, t: "Qualidade certificada", d: "Aço dentro das normas ABNT, lotes rastreáveis e laudo sob pedido." },
    { i: Truck, t: "Entrega expressa", d: "Frota própria com cobertura em todo o estado, 24h em SP capital." },
    { i: Hammer, t: "Suporte técnico", d: "Equipe especializada para orientar bitola, peso e aplicação." },
    { i: Award, t: "Condição competitiva", d: "Opções de fornecimento para compras pontuais e obras recorrentes." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14 flex items-end justify-between gap-4">
        <h2 className="text-4xl font-black leading-none md:text-6xl">Por que BLL do Brasil?</h2>
        <Link to="/sobre" className="hidden text-xs font-black uppercase tracking-[0.25em] text-brand-yellow hover:underline md:inline-flex">
          Sobre nós →
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.t} className="group glass rounded-2xl p-6 transition-transform hover:-translate-y-1">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-yellow text-brand-black transition-transform group-hover:rotate-6">
              <it.i size={22} />
            </div>
            <h3 className="mt-5 text-xl font-black">{it.t}</h3>
            <p className="mt-2 text-sm font-bold text-muted-foreground">{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuoteCta() {
  return (
    <section className="relative overflow-hidden border-y border-black/10 bg-white py-20 sm:py-24">
      <div className="absolute inset-y-0 left-0 w-full opacity-30 md:w-1/2">
        <div className="absolute -left-8 top-1/2 h-70 w-70 -translate-y-1/2 rounded-full bg-brand-yellow blur-[120px] sm:h-90 sm:w-90 md:-left-16 md:h-120 md:w-120 md:blur-[160px]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] md:gap-12 lg:gap-16">
        <div className="mx-auto max-w-xl text-center md:mx-0 md:justify-self-start md:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-brand-yellow">
            <MessageCircle size={12} /> Atendimento comercial
          </p>
          <h2 className="mt-5 text-4xl font-black leading-[0.95] sm:text-5xl md:text-6xl">
            Sua obra começa com uma <span className="text-gradient-yellow">boa cotação.</span>
          </h2>
          <p className="mt-5 max-w-md text-base font-bold text-muted-foreground">
            Conte o que você precisa e receba orientação para escolher material, quantidade, corte, dobra e entrega.
          </p>

          <ul className="mt-8 space-y-3 text-sm font-bold">
            <li className="flex items-center gap-3"><ClipboardCheck className="text-brand-yellow" size={18} /> Cotação conforme a necessidade da obra</li>
            <li className="flex items-center gap-3"><Clock className="text-brand-yellow" size={18} /> Retorno comercial em até 24 horas úteis</li>
            <li className="flex items-center gap-3"><ShieldCheck className="text-brand-yellow" size={18} /> Materiais com procedência e conferência</li>
          </ul>
        </div>

        <div className="glass relative mx-auto w-full max-w-115 rounded-2xl p-5 sm:p-6 md:p-8">
          <div className="absolute -top-3 left-8 rounded-full bg-brand-yellow px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-brand-black">Pronto para começar?</div>
          <h3 className="text-2xl font-black sm:text-3xl">Fale direto com a equipe.</h3>
          <p className="mt-3 text-sm font-bold leading-relaxed text-muted-foreground">Envie os detalhes da obra ou abra uma conversa pelo WhatsApp. Quanto mais informações, mais precisa será a cotação.</p>
          <div className="mt-6 grid gap-3 text-sm font-bold">
            {["Produto ou serviço desejado", "Quantidade e bitola", "Cidade e prazo de entrega"].map((item) => <p key={item} className="flex items-center gap-2"><CheckIcon />{item}</p>)}
          </div>
          <Link to="/orcamento-de-aco" className="btn-hero btn-hero-hover mt-7 w-full">Solicitar orçamento <ArrowRight size={18} /></Link>
          <Link to="/contato" className="mt-4 inline-flex w-full justify-center text-xs font-black uppercase tracking-[0.16em] text-brand-yellow hover:text-brand-black">Ver todos os canais de atendimento</Link>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-yellow text-xs font-black text-brand-black">✓</span>;
}

function SolutionsPreview() {
  const solutions = [
    { to: "/corte-e-dobra", eyebrow: "Precisão", title: "Corte e dobra", text: "Chapas e peças sob medida para montar com menos desperdício e mais controle." },
    { to: "/servicos", eyebrow: "Fabricação", title: "Estruturas metálicas", text: "Perfis especiais, canaletas para postos e porta-paletes para armazenamento industrial." },
    { to: "/armaduras-prontas", eyebrow: "Produtividade", title: "Armaduras prontas", text: "Organize lajes, vigas, pilares e fundações conforme o avanço da obra." },
    { to: "/solucoes-para-construtoras", eyebrow: "Parceria", title: "Para construtoras", text: "Planeje compras, produção e entregas com uma equipe comercial próxima." },
  ];

  return (
    <section className="mx-auto max-w-7xl px-3 py-20 sm:px-6 sm:py-24">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-brand-yellow">Soluções que fazem a obra avançar</p>
        <h2 className="mt-4 text-4xl font-black leading-none md:text-6xl">Mais do que aço. <span className="text-gradient-yellow">Mais resultado.</span></h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {solutions.map((solution) => (
          <Link key={solution.to} to={solution.to} className="glass group rounded-2xl p-6 transition-transform hover:-translate-y-1 sm:p-7">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-yellow">{solution.eyebrow}</p>
            <h3 className="mt-4 text-2xl font-black">{solution.title}</h3>
            <p className="mt-2 text-sm font-bold leading-relaxed text-muted-foreground">{solution.text}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-brand-yellow group-hover:text-brand-black">Conhecer solução <ArrowRight size={15} /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProductsTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl">
          <img src={productsImg} alt="Estoque de aço" loading="lazy" width={1280} height={960} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />
          <div className="absolute bottom-6 left-6 text-xs font-black uppercase tracking-[0.3em] text-brand-yellow drop-shadow-sm">
            Estoque industrial
          </div>
        </div>
        <div>
          <h2 className="text-5xl font-black leading-[0.95] md:text-6xl">Aço para cada etapa. <span className="text-gradient-yellow">Pronto para avançar.</span></h2>
          <p className="mt-5 text-base font-bold text-muted-foreground">
            Vergalhões, perfis estruturais, telas soldadas, treliças e chapas para diferentes necessidades de obra.
            Consulte disponibilidade e condições de entrega.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/produtos" className="btn-hero btn-hero-hover">Explorar produtos</Link>
            <Link to="/servicos" className="btn-ghost-yellow">Nossos serviços</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
