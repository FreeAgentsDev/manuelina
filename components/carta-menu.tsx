"use client";

import { AddToCart } from "@/components/cart";
import {
  menuItemId,
  menuItemPrice,
  type MenuSection,
} from "@/lib/site";

function SectionHeading({ section }: { section: MenuSection }) {
  if (section.header === "pill") {
    return (
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <h2 className="inline-flex rounded-full bg-paper px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-navy uppercase">
          {section.group}
        </h2>
        {section.note ? (
          <span className="text-xs font-semibold tracking-wide text-paper">
            {section.note}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mb-5">
      <h2 className="text-lg font-bold tracking-[0.16em] uppercase">
        {section.group}
      </h2>
      <div className="mt-1.5 h-px w-16 bg-paper" />
      {section.subgroup ? (
        <p className="mt-3 text-[11px] font-semibold tracking-[0.2em] text-mist uppercase">
          {section.subgroup}
        </p>
      ) : null}
      {section.note ? (
        <p className="mt-2 text-xs font-semibold tracking-wide text-paper">
          {section.note}
        </p>
      ) : null}
    </div>
  );
}

export function CartaMenu({ sections }: { sections: MenuSection[] }) {
  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <section key={`${section.group}-${section.subgroup ?? "main"}`}>
          <SectionHeading section={section} />
          <ul className="space-y-5">
            {section.items.map((item) => {
              const id = menuItemId(section, item);
              const price = menuItemPrice(section, item);
              return (
                <li key={id}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-sm font-bold tracking-[0.08em] uppercase">
                          {item.name}
                        </h3>
                        {price ? (
                          <span className="shrink-0 text-sm font-semibold tabular-nums">
                            {price}
                          </span>
                        ) : null}
                      </div>
                      {item.description ? (
                        <p className="mt-1 text-[13px] font-light leading-relaxed text-mist">
                          {item.description}
                        </p>
                      ) : null}
                    </div>
                    <AddToCart
                      id={id}
                      name={item.name}
                      group={section.group}
                      price={price}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
