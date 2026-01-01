import React from "react";
import { Text, ScrollView } from "react-native";
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

const PrivacyPolicy = () => {
    return (
        <SafeAreaView className="flex-1 bg-gray-100" edges={["bottom", "left", "right"]}>
            <ScrollView
                contentContainerStyle={{ padding: 20 }}
                showsVerticalScrollIndicator={false}
                className={"mt-5"}
            >
                <Text className="text-center text-3xl font-extrabold text-[#0A0A0A] mt-4">
                    Privacy Policy
                </Text>

                <Text className="text-center text-gray-500 mt-2 mb-8">
                    SitMyPet • Effective January 1, 2026
                </Text>

                <Section title="1. Introduction">
                    SitMyPet respects your privacy and is committed to protecting your personal information.
                    {"\n\n"}
                    This Privacy Policy explains how we collect, use, and share your information when you use our app.
                </Section>

                <Section title="2. Information We Collect">
                    We may collect the following information:
                    {"\n"}• Personal identification information (name, email, phone)
                    {"\n"}• Account and profile information
                    {"\n"}• Pet information you provide
                    {"\n"}• Usage and device information
                    {"\n"}• Location data when you use location services
                </Section>

                <Section title="3. How We Use Your Information">
                    We use your information to:
                    {"\n"}• Provide and improve our services
                    {"\n"}• Communicate with you
                    {"\n"}• Personalize your experience
                    {"\n"}• Process payments
                    {"\n"}• Comply with legal obligations
                </Section>

                <Section title="4. Sharing Your Information">
                    We may share your information with:
                    {"\n"}• Pet sitters you book through the app
                    {"\n"}• Service providers who support our operations
                    {"\n"}• Legal authorities if required by law
                    {"\n"}• Other users when you leave reviews or public content
                </Section>

                <Section title="5. Data Security">
                    We implement reasonable security measures to protect your data but cannot guarantee absolute security.
                </Section>

                <Section title="6. Your Rights">
                    Depending on your location, you may have rights to:
                    {"\n"}• Access, update, or delete your personal data
                    {"\n"}• Object to certain processing
                    {"\n"}• Withdraw consent where applicable
                    {"\n"}• Lodge complaints with data protection authorities
                </Section>

                <Section title="7. Cookies and Tracking">
                    We may use cookies and similar technologies to enhance your experience and analyze usage.
                </Section>

                <Section title="8. Children’s Privacy">
                    Our services are not intended for children under 18. We do not knowingly collect data from minors.
                </Section>

                <Section title="9. Changes to This Policy">
                    We may update this Privacy Policy from time to time. Continued use means acceptance of changes.
                </Section>

                <Section title="10. Contact Us">
                    If you have questions about this policy, please contact us at:
                    {"\n\n"}
                    📧 ramykhb18@gmail.com{"\n"}
                    📧 tarekalkhatibb@gmail.com{"\n"}
                    {"\n"}🐾 SitMyPet
                </Section>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PrivacyPolicy;