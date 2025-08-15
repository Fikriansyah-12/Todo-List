import RegisterForm from "./RegisterForm"

export default function RegisterPage() {
  return (
    <div className="relative bg-slate-50 min-h-screen flex items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-1/2"
        style={{
          backgroundImage: "url('/background/Shape.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="relative z-10 container flex justify-center">
        <RegisterForm/>
      </div>
    </div>
  );
}
