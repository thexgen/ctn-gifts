/** Accessible, centred tab bar. Controlled via `active` + `onChange`. */
export default function Tabs({ tabs, active, onChange, className = '' }) {
  const handleKeyDown = (event, index) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = (index + direction + tabs.length) % tabs.length;
    onChange(tabs[next].id);
    document.getElementById(`tab-${tabs[next].id}`)?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Product collections"
      className={`flex flex-wrap items-center justify-center gap-x-7 gap-y-2 border-b border-ink/10 sm:gap-x-12 ${className}`}
    >
      {tabs.map((tab, index) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`relative -mb-px whitespace-nowrap border-b-2 pb-3 pt-1 text-sm transition-colors duration-300 ${
              isActive
                ? 'border-ink font-medium text-ink'
                : 'border-transparent text-ink/40 hover:text-ink/75'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
