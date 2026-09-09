/**
 * Stav formulárov.
 *
 * Zámerne mimo `src/app/actions.ts`: súbor označený `"use server"` smie
 * exportovať iba asynchrónne funkcie, takže počiatočná hodnota stavu musí
 * žiť samostatne.
 */

export type FormState = {
  status: "idle" | "success" | "error";
  errors?: Record<string, string>;
  /** Vyplnené hodnoty sa vracajú späť, aby sa formulár po chybe nevyprázdnil. */
  values?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };
