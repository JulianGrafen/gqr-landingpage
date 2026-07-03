/** Ein FAQ-Paar für UI und FAQPage JSON-LD (1:1 synchron halten). */
export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type FaqPageQuestionEntity = {
  '@type': 'Question';
  name: string;
  acceptedAnswer: {
    '@type': 'Answer';
    text: string;
  };
};

/** Schema.org FAQPage — Google Rich Results Testing Tool kompatibel. */
export type FaqPageJsonLd = {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: FaqPageQuestionEntity[];
};
