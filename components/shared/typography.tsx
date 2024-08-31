import { Link } from "@navigation"

export function TypographyH1({ text }: { text: string }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {text}
    </h1>
  )
}

export function TypographyH2({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {text}
    </h2>
  )
}

export function TypographyH3({ text }: { text: string }) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {text}
    </h3>
  )
}

export function TypographyH4({ text }: { text: string }) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{text}</h4>
  )
}

export function TypographyP({ children }: { children: React.ReactNode }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
}

export function TypographyLead({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground text-xl">{children}</p>
}

export function TypographyBlockquote({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  )
}

export function TypographyAnchor({
  href,
  target,
  children,
}: {
  href: string
  target: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      target={target}
      className="after:bg-secondary-foreground after:text-secondary-foreground relative inline-flex flex-1 justify-center gap-1 leading-4 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:font-medium hover:after:origin-bottom-left hover:after:scale-x-100"
    >
      <span>{children}</span>
      <svg
        aria-hidden="true"
        height="7"
        viewBox="0 0 6 6"
        width="7"
        className="opacity-70"
      >
        <path
          d="M1.25215 5.54731L0.622742 4.9179L3.78169 1.75597H1.3834L1.38936 0.890915H5.27615V4.78069H4.40513L4.41109 2.38538L1.25215 5.54731Z"
          fill="currentColor"
        ></path>
      </svg>
    </Link>
  )
}
