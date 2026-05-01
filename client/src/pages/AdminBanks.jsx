import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const emptyForm = {
  name: "", interestRate: "", minScore: "",
  minIncome: "", maxLoanAmount: "", loanTypes: [],
};

const loanTypeOptions = ["Home", "Car", "Personal", "Education", "Business"];

export default function AdminBanks() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // "add" | "edit" | null
  const [deleteModal, setDeleteModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchBanks = async () => {
    try {
      const res = await api.get("/banks");
      setBanks(res.data);
    } catch {
      toast.error("Failed to load banks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBanks(); }, []);

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setModal("add");
  };

  const openEdit = (bank) => {
    setForm({
      name: bank.name || "",
      interestRate: bank.interestRate || "",
      minScore: bank.minScore || "",
      minIncome: bank.minIncome || "",
      maxLoanAmount: bank.maxLoanAmount || "",
      loanTypes: bank.loanTypes || [],
    });
    setEditId(bank._id);
    setModal("edit");
  };

  const handleLoanType = (type) => {
    setForm(prev => ({
      ...prev,
      loanTypes: prev.loanTypes.includes(type)
        ? prev.loanTypes.filter(t => t !== type)
        : [...prev.loanTypes, type]
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.interestRate) {
      toast.error("Bank name and interest rate required");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        interestRate: Number(form.interestRate),
        minScore: Number(form.minScore),
        minIncome: Number(form.minIncome),
        maxLoanAmount: Number(form.maxLoanAmount),
        loanTypes: form.loanTypes,
      };
      if (modal === "add") {
        await api.post("/banks", payload);
        toast.success("Bank added successfully!");
      } else {
        await api.put(`/banks/${editId}`, payload);
        toast.success("Bank updated successfully!");
      }
      setModal(null);
      fetchBanks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/banks/${deleteModal}`);
      toast.success("Bank deleted!");
      setDeleteModal(null);
      fetchBanks();
    } catch {
      toast.error("Failed to delete bank");
    }
  };

  const filteredBanks = banks.filter(b =>
    b.name?.toLowerCase().includes(search.toLowerCase())
  );

  const inputStyle = {
    width: "100%", padding: "10px 14px",
    borderRadius: "8px", border: "1.5px solid #d4920a",
    fontSize: "13px", outline: "none",
    color: "#0a2818", background: "#fafafa",
  };

  const labelStyle = {
    display: "block", fontSize: "12px",
    fontWeight: 500, color: "#374151", marginBottom: "6px",
  };

  return (
    <div style={{ background: "#f8faf9", minHeight: "100vh" }}>

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg, #0f3d22 0%, #0a2818 60%, #1a5c30 100%)",
        padding: "32px 32px 28px",
        borderBottom: "2px solid #d4920a"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 500, color: "#f5c842", marginBottom: "6px" }}>
              Bank Management
            </h1>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
              Add, edit and manage bank loan offers
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Stats */}
            <div style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(245,200,66,0.2)",
              borderRadius: "10px", padding: "10px 20px", textAlign: "center"
            }}>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#f5c842" }}>{banks.length}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>Total Banks</div>
            </div>
            <button
              onClick={openAdd}
              style={{
                background: "#d4920a", color: "white",
                padding: "10px 20px", borderRadius: "8px",
                border: "none", cursor: "pointer",
                fontSize: "13px", fontWeight: 500,
              }}
            >
              + Add Bank
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 32px" }}>

        {/* SEARCH */}
        <div style={{ position: "relative", marginBottom: "20px", maxWidth: "400px" }}>
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}>🔍</span>
          <input
            placeholder="Search banks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "10px 14px 10px 38px",
              borderRadius: "8px", border: "1.5px solid #d4920a",
              fontSize: "13px", outline: "none",
              color: "#0a2818", background: "white",
            }}
          />
        </div>

        {/* LOADING */}
        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ height: "180px", borderRadius: "12px", background: "#e5e7eb" }} />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredBanks.length === 0 && (
          <div style={{
            background: "white", border: "2px solid #d4920a",
            borderRadius: "12px", padding: "60px", textAlign: "center"
          }}>
            <p style={{ fontSize: "40px", marginBottom: "12px" }}>🏦</p>
            <p style={{ fontSize: "15px", fontWeight: 500, color: "#0a2818", marginBottom: "8px" }}>
              No banks found
            </p>
            <button
              onClick={openAdd}
              style={{
                background: "#0a2818", color: "#f5c842",
                padding: "10px 24px", borderRadius: "8px",
                border: "none", cursor: "pointer", fontSize: "13px",
              }}
            >
              + Add First Bank
            </button>
          </div>
        )}

        {/* BANK CARDS */}
        {!loading && filteredBanks.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
            {filteredBanks.map((bank) => (
              <div key={bank._id} style={{
                background: "white", borderRadius: "12px",
                border: "2px solid #d4920a", padding: "20px",
              }}>
                {/* Bank Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    background: "#0a2818", border: "1.5px solid #d4920a",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "16px", fontWeight: 700, color: "#f5c842", flexShrink: 0,
                  }}>
                    {bank.name?.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: 600, color: "#0a2818" }}>
                      {bank.name}
                    </p>
                    <p style={{ fontSize: "12px", color: "#1a7a3f", fontWeight: 500 }}>
                      {bank.interestRate}% p.a.
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                  {[
                    { label: "Min Credit Score", value: bank.minScore || "—" },
                    { label: "Min Income",        value: bank.minIncome ? `₹${Number(bank.minIncome).toLocaleString("en-IN")}` : "—" },
                    { label: "Max Loan",          value: bank.maxLoanAmount ? `₹${Number(bank.maxLoanAmount).toLocaleString("en-IN")}` : "—" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "11px", color: "#6b7280" }}>{item.label}</span>
                      <span style={{ fontSize: "12px", fontWeight: 500, color: "#0a2818" }}>{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Loan Types */}
                {bank.loanTypes?.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                    {bank.loanTypes.map((type, i) => (
                      <span key={i} style={{
                        fontSize: "10px", fontWeight: 500,
                        padding: "2px 8px", borderRadius: "20px",
                        background: "#fef8e0", color: "#b86e00",
                        border: "0.5px solid #d4920a"
                      }}>
                        {type}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => openEdit(bank)}
                    style={{
                      flex: 1, padding: "8px",
                      background: "#0a2818", color: "#f5c842",
                      borderRadius: "8px", border: "none",
                      cursor: "pointer", fontSize: "12px", fontWeight: 500,
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => setDeleteModal(bank._id)}
                    style={{
                      flex: 1, padding: "8px",
                      background: "#fdecea", color: "#c0392b",
                      borderRadius: "8px", border: "1px solid #f5c6c6",
                      cursor: "pointer", fontSize: "12px", fontWeight: 500,
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD/EDIT MODAL */}
      {modal && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 100, padding: "20px",
        }}>
          <div style={{
            background: "white", borderRadius: "16px",
            border: "2px solid #d4920a",
            padding: "32px", width: "100%", maxWidth: "500px",
            maxHeight: "90vh", overflowY: "auto",
          }}>
            <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#0a2818", marginBottom: "20px" }}>
              {modal === "add" ? "➕ Add New Bank" : "✏️ Edit Bank"}
            </h2>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* Name */}
              <div>
                <label style={labelStyle}>Bank Name *</label>
                <input
                  placeholder="e.g. HDFC Bank"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                />
              </div>

              {/* Interest Rate */}
              <div>
                <label style={labelStyle}>Interest Rate (% p.a.) *</label>
                <input
                  type="number" step="0.1"
                  placeholder="e.g. 8.5"
                  value={form.interestRate}
                  onChange={e => setForm({ ...form, interestRate: e.target.value })}
                  style={inputStyle}
                />
              </div>

              {/* 2 col grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Min Credit Score</label>
                  <input
                    type="number"
                    placeholder="e.g. 700"
                    value={form.minScore}
                    onChange={e => setForm({ ...form, minScore: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Min Monthly Income ₹</label>
                  <input
                    type="number"
                    placeholder="e.g. 25000"
                    value={form.minIncome}
                    onChange={e => setForm({ ...form, minIncome: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Max Loan */}
              <div>
                <label style={labelStyle}>Max Loan Amount ₹</label>
                <input
                  type="number"
                  placeholder="e.g. 5000000"
                  value={form.maxLoanAmount}
                  onChange={e => setForm({ ...form, maxLoanAmount: e.target.value })}
                  style={inputStyle}
                />
              </div>

              {/* Loan Types */}
              <div>
                <label style={labelStyle}>Loan Types</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {loanTypeOptions.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleLoanType(type)}
                      style={{
                        padding: "6px 14px", borderRadius: "20px",
                        border: "1.5px solid #d4920a", cursor: "pointer",
                        fontSize: "12px", fontWeight: 500,
                        background: form.loanTypes.includes(type) ? "#0a2818" : "white",
                        color: form.loanTypes.includes(type) ? "#f5c842" : "#6b7280",
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  style={{
                    flex: 1, padding: "11px",
                    border: "1.5px solid #d4920a",
                    borderRadius: "8px", background: "white",
                    color: "#6b7280", cursor: "pointer", fontSize: "13px",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    flex: 1, padding: "11px",
                    background: saving ? "#9ca3af" : "#0a2818",
                    color: "#f5c842", borderRadius: "8px",
                    border: "2px solid #d4920a",
                    cursor: saving ? "not-allowed" : "pointer",
                    fontSize: "13px", fontWeight: 500,
                  }}
                >
                  {saving ? "Saving..." : modal === "add" ? "Add Bank" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 100,
        }}>
          <div style={{
            background: "white", borderRadius: "16px",
            border: "2px solid #d4920a",
            padding: "32px", width: "100%", maxWidth: "400px",
          }}>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <p style={{ fontSize: "40px" }}>🏦</p>
            </div>
            <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#0a2818", marginBottom: "8px", textAlign: "center" }}>
              Delete Bank?
            </h2>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "24px", textAlign: "center" }}>
              Are you sure? This will remove the bank from all loan offers.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setDeleteModal(null)}
                style={{
                  flex: 1, padding: "11px",
                  border: "1.5px solid #d4920a",
                  borderRadius: "8px", background: "white",
                  color: "#6b7280", cursor: "pointer", fontSize: "13px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  flex: 1, padding: "11px",
                  background: "#c0392b", color: "white",
                  borderRadius: "8px", border: "none",
                  cursor: "pointer", fontSize: "13px", fontWeight: 500,
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}