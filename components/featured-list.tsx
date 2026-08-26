"use client";

import { AddToCart } from "@/components/cart";
import { FEATURED, menuItemId, menuItemPrice } from "@/lib/site";

export function FeaturedList({
  items,
}: {
  items: typeof FEATURED;
}) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map(({ section, item }) => {
        const id = menuItemId(section, item);
        const price = menuItemPrice(section, item);
        return (
          <li
            key={id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-white/15 px-4 py-3 text-sm"
          >
            <span className="min-w-0">
              <span className="block font-semibold tracking-wide uppercase">
                {item.name}
              </span>
              {price ? <span className="text-xs text-mist">{price}</span> : null}
            </span>
            <AddToCart
              id={id}
              name={item.name}
              group={section.group}
              price={price}
            />
          </li>
        );
      })}
    </ul>
  );
}
