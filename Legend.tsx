export default function Legend() {
  const items = [
    { label: 'SAFE & CONVENIENT', color: 'bg-green-500' },
    { label: 'OKAY WITH COMMUTE', color: 'bg-amber-400' },
    { label: 'FAR / TIME-CONSUMING', color: 'bg-red-500' },
  ];

  return (
    <div className="flex items-center justify-center gap-10 py-6">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2.5">
          <span className={`w-3 h-3 rounded-full ${item.color} shadow-sm`} />
          <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
