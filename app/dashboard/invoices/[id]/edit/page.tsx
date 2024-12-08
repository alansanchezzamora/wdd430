import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit an Invoice",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  // Extract the `id` from the props
  const params = await props.params;
  const id = params.id;

  // Fetch invoice and customers concurrently
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  // If the invoice is not found, show a 404 page
  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      {/* Pass the fetched data (invoice and customers) to the Form component */}
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
