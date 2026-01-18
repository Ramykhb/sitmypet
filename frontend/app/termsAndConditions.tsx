import React from "react";
import { Text, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInUp } from "react-native-reanimated";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Animated.View
        entering={FadeInUp.duration(400)}
        className="bg-white rounded-2xl p-5 mb-6 shadow-sm"
    >
        <Text className="text-xl font-semibold text-[#0A0A0A] mb-3">{title}</Text>
        <Text className="text-gray-700 leading-6">{children}</Text>
    </Animated.View>
);

const TermsAndConditions = () => {
    return (
        <SafeAreaView className="flex-1 bg-gray-100" edges={["bottom","left","right"]}>
            <ScrollView
                contentContainerStyle={{ padding: 20 }}
                showsVerticalScrollIndicator={false}
                className={"mt-5"}
            >
                <Text className="text-center text-3xl font-extrabold text-[#0A0A0A] mt-4">
                    Terms of Service
                </Text>

                <Text className="text-center text-gray-500 mt-2 mb-8">
                    SitMyPet • Effective January 1, 2026
                </Text>

                <Section title="1. About SitMyPet">
                    SitMyPet connects pet owners (“Owners”) with independent pet sitters
                    (“Sitters”) for services such as pet sitting, walking, and feeding.
                    {"\n\n"}
                    SitMyPet does not provide pet care services directly and is not a party
                    to agreements between Owners and Sitters.
                </Section>

                <Section title="2. Eligibility">
                    • You must be at least 18 years old{"\n"}
                    • Have legal capacity to enter a binding agreement{"\n"}
                    • Provide accurate and complete account information{"\n\n"}
                    SitMyPet may suspend or terminate accounts with false or misleading
                    information.
                </Section>

                <Section title="3. User Accounts">
                    You are responsible for safeguarding your account credentials and all
                    activity under your account.
                    {"\n\n"}
                    Notify us immediately of unauthorized access. SitMyPet is not liable
                    for losses caused by unauthorized use.
                </Section>

                <Section title="4. Roles & Responsibilities">
                    <Text className="font-semibold text-gray-900">Owners</Text>
                    {"\n"}• Provide accurate pet information{"\n"}
                    • Ensure pets are safe and legally owned{"\n"}
                    • Communicate clearly with Sitters{"\n\n"}

                    <Text className="font-semibold text-gray-900">Sitters</Text>
                    {"\n"}• Perform services responsibly{"\n"}
                    • Accurately represent experience{"\n"}
                    • Follow applicable laws{"\n\n"}

                    Sitters are independent contractors, not employees of SitMyPet.
                </Section>

                <Section title="5. Bookings & Payments">
                    • All bookings occur through the app{"\n"}
                    • Fees and cancellation policies are shown in-app{"\n"}
                    • SitMyPet may charge platform fees{"\n\n"}
                    Refunds and disputes follow SitMyPet policies.
                </Section>

                <Section title="6. User Conduct">
                    You agree not to misuse the platform, harm users or animals, share
                    misleading content, bypass payments, or interfere with systems.
                    {"\n\n"}
                    Violations may result in suspension or termination.
                </Section>

                <Section title="7. Reviews & Feedback">
                    Reviews must be honest and respectful. SitMyPet may remove reviews that
                    violate these Terms.
                </Section>

                <Section title="8. Safety & Liability">
                    SitMyPet does not guarantee user behavior or service quality.
                    {"\n\n"}
                    To the fullest extent permitted by law, SitMyPet is not liable for pet
                    injuries, losses, property damage, or disputes.
                </Section>

                <Section title="9. Insurance">
                    SitMyPet does not provide insurance unless explicitly stated. Users are
                    encouraged to obtain their own coverage.
                </Section>

                <Section title="10. Intellectual Property">
                    All content, branding, and software belong to SitMyPet or its licensors.
                    Unauthorized use is prohibited.
                </Section>

                <Section title="11. Termination">
                    SitMyPet may suspend or terminate accounts for violations, fraud, or
                    legal requirements. You may stop using the service at any time.
                </Section>

                <Section title="12. Privacy">
                    Your use of SitMyPet is governed by our Privacy Policy.
                </Section>

                <Section title="13. Changes to Terms">
                    Continued use of SitMyPet after updates means you accept the revised
                    Terms.
                </Section>

                <Section title="14. Governing Law">
                    These Terms are governed by the laws of the applicable jurisdiction.
                </Section>

                <Section title="15. Contact Us">
                    If you have questions, contact us at:
                    {"\n\n"}
                    📧 ramykhb18@gmail.com{"\n"}
                    📧 tarekalkhatibb@gmail.com{"\n"}
                    🐾 SitMyPet
                </Section>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TermsAndConditions;