import PageContent from "../components/PageContent";
import NewsletterSignup from "../components/NewsletterSignup";

function NewsletterPage() {
  return (
    <PageContent title="Join our awesome newsletter!">
      <NewsletterSignup />
    </PageContent>
  );
}

export default NewsletterPage;

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get("email");

  // 서버로 이메일 정보 보내는 중
  console.log(email);
  return { message: "Signup successful!" };
}
