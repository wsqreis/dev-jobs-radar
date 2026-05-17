const milestones = [
  "Integração com Google Jobs via SerpApi",
  "Dashboard PT-BR com filtros e presets",
  "Modo demo sem chave para avaliação pública",
  "CLI para buscas e exportação de resultados",
  "README bilíngue e documentação para blog post",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_40%),linear-gradient(180deg,_#0f172a_0%,_#111827_100%)] px-6 py-16 text-slate-50 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur sm:p-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-sky-200">
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1">
                Portfólio DevRel
              </span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1">
                SerpApi + Next.js
              </span>
              <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1">
                Brasil + Portugal
              </span>
            </div>

            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-200">
                Dev Jobs Radar
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Radar de vagas para devs com foco no mercado lusófono.
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Este projeto usa SerpApi para transformar buscas de vagas em uma
                experiência útil para desenvolvedores brasileiros e portugueses.
                O repositório será construído como um portfólio público, com web
                UI, CLI e documentação bilíngue.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <h2 className="text-2xl font-semibold text-white">
              Escopo desta primeira entrega
            </h2>
            <ul className="mt-6 space-y-4 text-slate-300">
              {milestones.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <aside className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <h2 className="text-2xl font-semibold text-white">Próximos passos</h2>
            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-300">
              <p>
                A próxima milestone adiciona a camada de integração com a Google
                Jobs API da SerpApi e um modo demo com fixture local.
              </p>
              <p>
                Depois disso, a home será substituída por um dashboard com
                presets, filtros, cards de vaga e um painel para mostrar a
                integração técnica usada no projeto.
              </p>
              <p>
                O objetivo é que qualquer recrutador ou desenvolvedor consiga
                rodar o projeto rapidamente e entender tanto o produto quanto a
                implementação.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
