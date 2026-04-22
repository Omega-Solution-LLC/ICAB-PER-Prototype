import { GuidedQuestionForm } from "../shared/guided-question-form";

export interface EthicsApplicationFormProps {
  onSubmit: (data: Record<string, string>) => Promise<void>;
}

export function EthicsApplicationForm({
  onSubmit,
}: EthicsApplicationFormProps) {
  const questions = [
    {
      id: "q1",
      label: "Ethical Leadership",
      description:
        "Describe an instance where you navigated an ethical dilemma with integrity.",
    },
    {
      id: "q2",
      label: "Independence",
      description:
        "Provide an example where you assessed and maintained independence in fact and appearance during an engagement.",
    },
    {
      id: "q3",
      label: "Professional Skepticism",
      description:
        "Explain a scenario where you applied professional skepticism effectively.",
    },
  ];

  return (
    <div className="border border-gray-200">
      {/* Header */}
      <div className="bg-gray-700 text-white text-left px-5 py-3 text-sm font-semibold tracking-wide">
        Ethics Application Documentation
      </div>

      {/* Body */}
      <div className="bg-gray-50 px-5 py-5">
        <p className="text-sm text-gray-600 mb-6 font-normal">
          Answer the following prompts to complete your final Ethics
          Application. Your responses will be reviewed by your principal to
          ensure you demonstrate the required ethical competencies.
        </p>

        <GuidedQuestionForm
          questions={questions}
          onSubmit={onSubmit}
          submitLabel="Submit Application"
        />
      </div>
    </div>
  );
}
