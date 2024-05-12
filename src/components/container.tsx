export default function CardContainer({
  children,
  className,
  childClass,
}: Readonly<{
  children?: React.ReactNode;
  className?: string;
  childClass?: string;
}>) {
  return (
    <div className={className}>
      <div className={`${childClass} px-10 py-9 bg-background rounded-md`}>
        {children}
      </div>
    </div>
  )
}