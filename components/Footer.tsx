export default function Footer() {
  return (
    <footer className="mt-20 border-t">
      <div className="container-6xl py-10 text-sm text-gray-600">
        © {new Date().getFullYear()} Your VC — All rights reserved.
      </div>
    </footer>
  );
}
