import { BlurFade } from "@/components/fancy/blur-fade"
import { Icons } from "@/components/shared/icons"
import { Card, CardContent } from "@/components/ui/card"
import { Section } from "@/components/ui/section"

const problems = [
  {
    title: "High Costs for AI Services",
    description:
      "Developers and businesses face steep costs when using traditional AI services, making it hard to scale projects without significant budgets.",
    icon: Icons.dollar,
  },
  {
    title: "Complex AI Integration",
    description:
      "Integrating AI models into applications is often a technical challenge, requiring extensive knowledge and setup, which can slow down development.",
    icon: Icons.code,
  },
  {
    title: "Slow and Inefficient Inference",
    description:
      "Many AI services offer slow inference speeds, which can lead to delays and a poor user experience. Faster solutions are needed to meet real-time demands.",
    icon: Icons.clock,
  },
]

export function MarketingProblem() {
  return (
    <Section title="Problem" subtitle="Hard Keys in AI Development">
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {problems.map((problem, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="border-none bg-background shadow-none">
              <CardContent className="space-y-4 p-6">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                  <problem.icon className="size-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </Section>
  )
}
