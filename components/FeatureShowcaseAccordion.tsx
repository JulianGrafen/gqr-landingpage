'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { FeatureShowcaseItem } from '@/config/feature-showcase';

type FeatureShowcaseAccordionProps = {
  items: FeatureShowcaseItem[];
  defaultOpenIndex?: number;
};

const bodyTransition = {
  duration: 0.28,
  ease: [0.4, 0, 0.2, 1] as const,
};

export function FeatureShowcaseAccordion({
  items,
  defaultOpenIndex = 0,
}: FeatureShowcaseAccordionProps) {
  const reduceMotion = useReducedMotion();
  const initialOpenIndex = useMemo(
    () => (defaultOpenIndex >= 0 && defaultOpenIndex < items.length ? defaultOpenIndex : 0),
    [defaultOpenIndex, items.length],
  );
  const [openIndex, setOpenIndex] = useState(initialOpenIndex);

  return (
    <>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={`${item.number}-${item.heading}`}
            className={`sds-entry-card${isOpen ? ' is-open' : ''}`}
            data-open={isOpen ? 'true' : 'false'}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: reduceMotion ? 0 : 0.35,
              delay: reduceMotion ? 0 : index * 0.05,
              ease: [0.4, 0, 0.2, 1],
            }}
            layout={!reduceMotion}
          >
            <button
              type="button"
              className="sds-entry-card__summary"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span className="sds-entry-card__number">{item.number}</span>
              <span className="sds-entry-card__heading">{item.heading}</span>
              <span
                className="sds-entry-card__feature-icon"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: item.iconHtml }}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  className="sds-entry-card__body-wrapper"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={reduceMotion ? { duration: 0 } : bodyTransition}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="sds-entry-card__body">
                    <strong className="sds-entry-card__title">{item.title}</strong>
                    <p>{item.description}</p>
                    <a href={item.href}>Anwendungsfall ansehen →</a>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </>
  );
}
