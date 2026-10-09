import { formatPrice } from "@/lib/bn";

export default function MarketTable({ markets, lowest, highest }) {
  const span = highest - lowest || 1;

  return (
    <div className="overflow-x-auto rounded-[30px] bg-n-100 shadow-sm">
      <table className="w-full min-w-[640px] text-[15px]">
        <thead>
          <tr className="border-b border-ink/8 text-left text-[13px] text-ink/60">
            <th className="px-4 py-3.5 font-semibold">বাজার</th>
            <th className="px-4 py-3.5 font-semibold">বিভাগ</th>
            <th className="w-[30%] px-4 py-3.5 font-semibold">দামের পরিসর</th>
            <th className="px-4 py-3.5 text-right font-semibold">সর্বনিম্ন</th>
            <th className="px-4 py-3.5 text-right font-semibold">সর্বাধিক</th>
            <th className="px-4 py-3.5 text-right font-semibold">গড়</th>
          </tr>
        </thead>
        <tbody>
          {markets.map((m) => (
            <tr key={m.market} className="border-b border-ink/8 last:border-0 hover:bg-ink/4">
              <td className="px-4 py-3.5 font-semibold whitespace-nowrap">{m.market}</td>
              <td className="px-4 py-3.5 whitespace-nowrap text-n-700">{m.division}</td>
              <td className="px-4 py-3.5">
                <div className="relative h-2.5 rounded-full bg-n-200">
                  <span
                    className="absolute inset-y-0 rounded-full bg-linear-to-r from-g-500 to-a-500"
                    style={{
                      left: `${((m.min - lowest) / span) * 100}%`,
                      width: `${Math.max(6, ((m.max - m.min) / span) * 100)}%`,
                    }}
                  />
                </div>
              </td>
              <td className="px-4 py-3.5 text-right whitespace-nowrap text-g-700">{formatPrice(m.min)} টাকা</td>
              <td className="px-4 py-3.5 text-right whitespace-nowrap text-a-700">{formatPrice(m.max)} টাকা</td>
              <td className="px-4 py-3.5 text-right font-bold whitespace-nowrap">{formatPrice(m.avg)} টাকা</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
