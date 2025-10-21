export default function Footer() {
  return (
    <footer className="border-t py-4 bg-muted/30">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} <span className="font-semibold text-blue-600">PulseCare</span>. All rights reserved.
      </div>
    </footer>
  )
}
