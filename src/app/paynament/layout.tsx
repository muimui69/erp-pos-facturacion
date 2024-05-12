interface PayLayoutProps {
  children: React.ReactNode
}

export default function PayLayout({ children }: PayLayoutProps) {
  return <div className="min-h-screen">{children}</div>
}
