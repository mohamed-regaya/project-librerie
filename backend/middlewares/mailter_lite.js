import MailerLite from "@mailerlite/mailerlite-nodejs";

const mailerlite = new MailerLite({
  api_key:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMTgxOGMwNjk2MDg2YzVmOWQ1MzNkMDQ0NzU0MzU4MWVkNjVlOGFkM2Q5YjY1NmYwYmU2OGYyNWE4NTdmMzQyNjdlOTkwODUyMzExZmEzNzIiLCJpYXQiOjE3NzA1NDM5MDYuMTU3OTQ2LCJuYmYiOjE3NzA1NDM5MDYuMTU3OTQ5LCJleHAiOjQ5MjYyMTc1MDYuMTUwNjU3LCJzdWIiOiIyMTE2NjI0Iiwic2NvcGVzIjpbXX0.gaSpR8wOZJS_DDLRWIfCFzmsAz2qxu3jdvj9CNNvOb1G5MTXUAi3-u-Pz1SSwOJOiEXhtU9LuPg7gPmx_s6iuV7m30iX2PXrTAQSTrsX7qx03UMdD-otKMV6_wZZ5fE6idjeIWfcn-Yx-bV4PkCnncmVYO-djOsTSQGQJvoB2zREIGZj8UCIk-d_gFHYe1aO0BilxnG1NXsD1-s94Ex0G0C6uaLAPRhNQQwJODxu8Ct-3FDo2435lAh90xyppzgk9FKUsTPXYNQoHr2Xmvmn3XBmS-uWdKNCWRMOU3D3cOCDLIH24Wtg7-vDIwYlmiBYupbCX6B9PueWscPg79handnXufv0_Fj2WCQ2bN_LUo42p7_ECBRp-gyZOVToWRgd3QJvB670-bkriomJfm6Dc-Ik6Smt1EUbrTKkHqpX7dm4tbjaLut4xtPVdWBEAO_w2Is5rshX5kWN_RzoP8xMnb1UP6crESqehnur-KK69C-f-eLRKYo-_nDCu0xaTZluYri2-on2oxIgRYBkVGIBERz7rapsRTELL1nFf2tZG_hBlw2WsU33KlBfecG-17Z21wv844lrrNV-ijKbs3Boq9ditXIecEJ2Nwy21yDQNObMkQx34xDaU4pKcQFjoHwoZD9I91M1JuXl_NiionYgcJ-s5oUGKuCcnw7KtU2f5_c",
});

const GROUP_ID = "178829081434916055";

/**
 * Send one email to one user using MailerLite
 */
export async function sendSingleEmail({
  email,
  subject,
  html,
  fromName = "Your App",
  fromEmail = "hamaregaya20@gmail.com",
}) {
  if (!email || !subject || !html) {
    throw new Error("email, subject, and html are required");
  }

  // 1. Add / update subscriber in temp group
  await mailerlite.subscribers.createOrUpdate({
    email,
    groups: [GROUP_ID],
  });

  // 2. Create campaign
  const campaign = await mailerlite.campaigns.create({
    name: `Single send → ${email}`,
    type: "regular",
    groups: [GROUP_ID],
    emails: [
      {
        subject,
        from_name: fromName,
        from_email: fromEmail,
        content: html,
      },
    ],
  });

  // 3. Send immediately
  await mailerlite.campaigns.send(campaign.data.id);

  // 4. Remove user from group (cleanup)
  await mailerlite.subscribers.update(email, {
    groups: [],
  });

  return { success: true };
}
