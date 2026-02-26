import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        paddingTop: "60px",
        backgroundColor: "#0e0e0e", // dark grey backdrop
      }}
    >
      <div style={{ width: "320px" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#ff9800", // orange heading (site orange)
            fontSize: "22px",
            fontWeight: "600",
          }}
        >
          Signup to speak with S8NT AI
        </h1>

        <SignUp
          appearance={{
            variables: {
              colorPrimary: "#ff9800", // orange accents (site orange)
              colorText: "#111111",    // dark text for readability
            },
            elements: {
              card: {
                backgroundColor: "#f5f5f5", // light grey card
                borderRadius: "14px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                padding: "24px",
              },
              formButtonPrimary: {
                backgroundColor: "#ff9800", // orange button
                color: "#111111",           // dark text
                fontSize: "15px",
                padding: "12px",
                borderRadius: "10px",
              },
              formInput: {
                backgroundColor: "#ffffff", // white inputs
                color: "#111111",           // dark input text
                borderRadius: "10px",
                padding: "12px",
                fontSize: "14px",
                border: "1px solid #ccc",  // light border
              },
              headerTitle: { display: "none" },
              headerSubtitle: { display: "none" },
            },
          }}
        />
      </div>
    </div>
  );
}