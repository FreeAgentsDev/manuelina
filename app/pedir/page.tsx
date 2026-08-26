import { redirect } from "next/navigation";

import { PEDIDO_HREF } from "@/lib/site";

export default function PedirPage() {
  redirect(PEDIDO_HREF);
}
