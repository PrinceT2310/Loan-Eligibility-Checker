export default function SkeletonCard({ rows = 3 }) {
  return (
    <div
      className="rounded-xl p-6 animate-pulse"
      style={{ background: "white", border: "0.5px solid #e5e7eb" }}
    >
      <div
        className="rounded mb-4"
        style={{ height: "16px", background: "#f3f4f6", width: "33%" }}
      />
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="rounded mb-3"
          style={{
            height: "12px",
            background: "#f3f4f6",
            width: `${80 - i * 10}%`,
          }}
        />
      ))}
    </div>
  );
}