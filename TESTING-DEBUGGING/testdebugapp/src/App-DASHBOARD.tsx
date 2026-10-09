import { useMemo, useState } from "react";

import { scenarios } from "./data/scenarios";

// Scenario imports
import ConsoleScenario from "./scenarios/console/ConsoleScenario";
import NetworkScenario from "./scenarios/network/NetworkScenario";
import ElementsScenario from "./scenarios/elements/ElementsScenario";
import SourcesScenario from "./scenarios/sources/SourcesScenario";
import ReactDevToolsScenario from "./scenarios/react-devtools/ReactDevToolsScenario";
import StateScenario from "./scenarios/react-devtools/StateScenario";
import UseEffectScenario from "./scenarios/use-effect/UseEffectScenario";
import ResponsiveScenario from "./scenarios/responsive/ResponsiveScenario";
import FormsScenario from "./scenarios/forms/FormsScenario";
import ReactQueryScenario from "./scenarios/react-query/ReactQueryScenario";
import TypeScriptScenario from "./scenarios/typescript/TypeScriptScenario";

const categories = [
  "All",
  "Console",
  "Network",
  "Elements",
  "Sources",
  "React DevTools",
  "Hooks",
  "Responsive Design",
  "Forms",
  "React Query",
  "TypeScript",
] as const;

const categoryIcons: Record<string, string> = {
  Console: "⌘",
  Network: "⇄",
  Elements: "▣",
  Sources: "</>",
  "React DevTools": "⚛",
  Hooks: "↻",
  "Responsive Design": "▤",
  Forms: "☑",
  "React Query": "◈",
  TypeScript: "TS",
};

// Keep only the first scenario in each category.
const dashboardScenarios = scenarios.filter(
  (scenario, index, allScenarios) =>
    allScenarios.findIndex((item) => item.category === scenario.category) ===
    index,
);

function App() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const filteredScenarios = useMemo(() => {
    return dashboardScenarios.filter((scenario) => {
      const matchesCategory =
        activeCategory === "All" || scenario.category === activeCategory;

      const searchText = search.toLowerCase();

      const matchesSearch =
        scenario.title.toLowerCase().includes(searchText) ||
        scenario.description.toLowerCase().includes(searchText) ||
        scenario.tools.some((tool) => tool.toLowerCase().includes(searchText));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const categoryCount = (category: string) =>
    category === "All"
      ? dashboardScenarios.length
      : dashboardScenarios.filter((item) => item.category === category).length;

  // Render the selected debugging scenario.
  const renderScenario = () => {
    switch (selectedScenario) {
      case "console-undefined":
      case "console-click":
        return <ConsoleScenario />;

      case "network-404":
      case "network-response":
      case "network-loading":
        return <NetworkScenario />;

      case "elements-css":
      case "elements-hidden":
        return <ElementsScenario />;

      case "sources-breakpoint":
        return <SourcesScenario />;

      case "props-debug":
        return <ReactDevToolsScenario />;

      case "state-debug":
        return <StateScenario />;

      case "effect-repeat":
      case "effect-loop":
        return <UseEffectScenario />;

      case "responsive-overflow":
        return <ResponsiveScenario />;

      case "form-validation":
        return <FormsScenario />;

      case "query-stale":
        return <ReactQueryScenario />;

      case "typescript-build":
        return <TypeScriptScenario />;

      default:
        return (
          <div className="mx-auto max-w-3xl p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-800">
              Scenario Not Implemented
            </h2>

            <p className="mt-3 text-slate-600">
              This exercise has not been connected to a scenario page yet.
            </p>
          </div>
        );
    }
  };

  // Display the selected scenario.
  if (selectedScenario !== null) {
    return (
      <div className="min-h-screen bg-slate-100">
        <div className="mx-auto max-w-5xl px-4 pt-5">
          <button
            onClick={() => setSelectedScenario(null)}
            className="mb-5 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            ← Back to Dashboard
          </button>
        </div>

        {renderScenario()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-900/70 p-5 lg:block">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500 font-bold text-slate-950">
              {"</>"}
            </div>

            <div>
              <h1 className="font-bold">React Debug Lab</h1>
              <p className="text-xs text-slate-400">Testing & Debugging</p>
            </div>
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Debugging Tools
          </p>

          <nav className="space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  activeCategory === category
                    ? "bg-cyan-500/15 text-cyan-300"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span>
                  {category === "All" ? "▦" : categoryIcons[category]}{" "}
                  {category}
                </span>

                <span className="text-xs">{categoryCount(category)}</span>
              </button>
            ))}
          </nav>

          <div className="mt-10 rounded-xl border border-slate-700 bg-slate-800/60 p-4">
            <p className="font-semibold text-cyan-300">Hands-on learning</p>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Find the bug, investigate the cause, and implement the correct
              solution.
            </p>
          </div>
        </aside>

        {/* Main dashboard */}
        <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-medium text-cyan-400">
                MODULE 14 / PRACTICAL LAB
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                React Debugging Lab
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Master Chrome DevTools by investigating real React application
                problems.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
              <p className="text-xs text-emerald-300">Lab status</p>
              <p className="mt-1 font-semibold">Dashboard Ready</p>
            </div>
          </header>

          {/* Statistics */}
          <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              label="Debugging Scenarios"
              value={dashboardScenarios.length}
              description="One exercise per category"
            />

            <StatCard
              label="Categories"
              value={categories.length - 1}
              description="Developer tools and concepts"
            />

            <StatCard
              label="Learning Mode"
              value="Practical"
              description="Problem → Investigation → Fix"
            />
          </section>

          {/* Search and mobile filters */}
          <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5">
            <label
              htmlFor="scenario-search"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Search debugging scenarios
            </label>

            <input
              id="scenario-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search API errors, useEffect, CSS..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full border px-3 py-2 text-xs ${
                    activeCategory === category
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                      : "border-slate-700 text-slate-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Scenario list header */}
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">
                {activeCategory === "All" ? "All Scenarios" : activeCategory}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                {filteredScenarios.length} exercise(s) found
              </p>
            </div>

            <button
              onClick={() => {
                setActiveCategory("All");
                setSearch("");
              }}
              className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
            >
              Reset filters
            </button>
          </div>

          {/* Clickable scenario cards */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredScenarios.map((scenario, index) => (
              <article
                key={scenario.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedScenario(scenario.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedScenario(scenario.id);
                  }
                }}
                className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:-translate-y-1 hover:border-cyan-500/50 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 font-bold text-cyan-300">
                    {categoryIcons[scenario.category] ?? "⚙"}
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs ${
                      scenario.difficulty === "Beginner"
                        ? "bg-emerald-500/10 text-emerald-300"
                        : scenario.difficulty === "Intermediate"
                          ? "bg-amber-500/10 text-amber-300"
                          : "bg-rose-500/10 text-rose-300"
                    }`}
                  >
                    {scenario.difficulty}
                  </span>
                </div>

                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-cyan-400">
                  {String(index + 1).padStart(2, "0")} / {scenario.category}
                </p>

                <h4 className="text-lg font-semibold transition group-hover:text-cyan-300">
                  {scenario.title}
                </h4>

                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
                  {scenario.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {scenario.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-400"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="mt-5 border-t border-slate-800 pt-4">
                  <p className="text-sm font-medium text-cyan-300">
                    Open debugging exercise →
                  </p>
                </div>
              </article>
            ))}
          </section>

          {filteredScenarios.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-700 p-12 text-center">
              <p className="text-lg font-semibold">No scenarios found</p>

              <p className="mt-2 text-sm text-slate-400">
                Try a different search term or category.
              </p>
            </div>
          )}

          <footer className="mt-10 border-t border-slate-800 py-5 text-center text-xs text-slate-500">
            React Debugging Lab · Learn by finding and fixing bugs
          </footer>
        </main>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  description: string;
}

function StatCard({ label, value, description }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{description}</p>
    </div>
  );
}

export default App;
