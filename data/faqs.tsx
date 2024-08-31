export const faqs = (t: (arg: string) => string) => [
  {
    section: t("section-1.title"),
    qa: [
      {
        question: t("section-1.questions.ques-1"),
        answer: <span>{t("section-1.questions.answer-1")}</span>,
      },
      {
        question: t("section-1.questions.ques-2"),
        answer: <span>{t("section-1.questions.answer-2")}</span>,
      },
    ],
  },
  {
    section: t("section-2.title"),
    qa: [
      {
        question: t("section-2.questions.ques-1"),
        answer: <span>{t("section-2.questions.answer-1")}</span>,
      },
      {
        question: t("section-2.questions.ques-2"),
        answer: <span>{t("section-2.questions.answer-2")}</span>,
      },
    ],
  },
  {
    section: t("section-3.title"),
    qa: [
      {
        question: t("section-3.questions.ques-1"),
        answer: <span>{t("section-3.questions.answer-1")}</span>,
      },
      {
        question: t("section-3.questions.ques-2"),
        answer: <span>{t("section-3.questions.answer-2")}</span>,
      },
    ],
  },
  {
    section: t("section-4.title"),
    qa: [
      {
        question: t("section-4.questions.ques-1"),
        answer: <span>{t("section-4.questions.answer-1")}</span>,
      },
      {
        question: t("section-4.questions.ques-2"),
        answer: <span>{t("section-4.questions.answer-2")}</span>,
      },
    ],
  },
]
