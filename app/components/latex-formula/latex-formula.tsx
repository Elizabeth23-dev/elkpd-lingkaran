import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import styles from './latex-formula.module.css';

export interface LatexFormulaProps {
  formula: string;
  display?: boolean;
  className?: string;
}

export function LatexFormula({ formula, display = false, className }: LatexFormulaProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(formula, ref.current, {
        throwOnError: false,
        displayMode: display,
      });
    } catch {
      if (ref.current) ref.current.textContent = formula;
    }
  }, [formula, display]);

  return <span ref={ref} className={`${styles.root} ${className ?? ''}`} />;
}
