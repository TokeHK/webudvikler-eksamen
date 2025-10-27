export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} XXX Company. All rights reserved.</p>

        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:text-blue-600 transition">Privacy</a>
          <a href="#" className="hover:text-blue-600 transition">Terms</a>
          <a href="#" className="hover:text-blue-600 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
