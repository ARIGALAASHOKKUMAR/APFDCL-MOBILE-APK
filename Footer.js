import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";

export const baseImageUrl =
  "https://apfdcl.ap.gov.in/uploads/dashboard/";

const Footer = () => {
  const openExternalLink = (url) => {
    Alert.alert(
      "External Link",
      "You are leaving our site. Do you want to continue?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Continue",
          onPress: async () => {
            try {
              const supported = await Linking.canOpenURL(url);

              if (supported) {
                await Linking.openURL(url);
              } else {
                Alert.alert("Error", "Unable to open this link.");
              }
            } catch (error) {
              Alert.alert("Error", "Unable to open this link.");
            }
          },
        },
      ]
    );
  };

  const quickLinks = [
    {
      href: "https://forests.ap.gov.in/",
      text: "AP Forest Dept",
    },
    {
      href: "https://konugolu.ap.gov.in/",
      text: "AP e-Procurement",
    },
  ];

  const usefulLinks = [
    {
      href: "https://ap.gov.in/",
      text: "AP Govt",
    },
    {
      href: "https://parichay.nic.in/",
      text: "e-Office",
    },
    {
      href: "https://goir.ap.gov.in/",
      text: "AP GOIR",
    },
  ];

  return (
    <View style={styles.footerBg}>
      <View style={styles.footerOverlay}>
        <View style={styles.container}>

          {/* ================= CONTACT US ================= */}

          <View style={styles.column}>
            <Text style={styles.heading}>Contact Us</Text>

            <View style={styles.underline} />

            <Text style={styles.contactText}>
              APFDC Head Office{"\n"}
              3rd Floor, PVS Landmark Building,{"\n"}
              Industrial Park,{" "}
              <Text style={styles.bold}>Mangalagiri</Text>,{"\n"}
              Guntur District{"\n"}
              Andhra Pradesh – 522503
            </Text>
          </View>

          {/* ================= QUICK LINKS ================= */}

          <View style={styles.column}>
            <Text style={styles.heading}>Quick Links</Text>

            <View style={styles.underline} />

            <View style={styles.linksContainer}>
              {quickLinks.map((link, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.linkRow}
                  onPress={() => openExternalLink(link.href)}
                  accessibilityRole="link"
                  accessibilityLabel={link.text}
                >
                  <Text style={styles.linkIcon}>🔗</Text>

                  <Text style={styles.linkText}>
                    {link.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ================= USEFUL LINKS ================= */}

          <View style={styles.column}>
            <Text style={styles.heading}>Useful Links</Text>

            <View style={styles.underline} />

            <View style={styles.linksContainer}>
              {usefulLinks.map((link, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.linkRow}
                  onPress={() => openExternalLink(link.href)}
                  accessibilityRole="link"
                  accessibilityLabel={link.text}
                >
                  <Text style={styles.linkIcon}>🔗</Text>

                  <Text style={styles.linkText}>
                    {link.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ================= LOGO ================= */}

          <View style={styles.logoColumn}>
            <View style={styles.wrapperContainer}>

              <Image
                source={{
                  uri: `${baseImageUrl}index4utils/wrapper-design.svg`,
                }}
                style={styles.wrapperImage}
                resizeMode="contain"
                accessibilityLabel="Wrapper design"
              />

              <Image
                source={{
                  uri: `${baseImageUrl}index4utils/images/apLogo.png`,
                }}
                style={styles.emblem}
                resizeMode="contain"
                accessibilityLabel="Andhra Pradesh Government emblem"
              />

            </View>
          </View>

        </View>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  /* =====================================================
     FOOTER
  ===================================================== */

  footerBg: {
    width: "100%",
    backgroundColor: "#1d5638",
  },

  footerOverlay: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },

  /* =====================================================
     HORIZONTAL CONTAINER
  ===================================================== */

  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 20,

    // All four sections in one horizontal row
    flexDirection: "row",

    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  /* =====================================================
     COLUMNS
  ===================================================== */

  column: {
    paddingHorizontal: 5,
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 5,
  },

  underline: {
    height: 2,
    width: 35,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },

  /* =====================================================
     CONTACT
  ===================================================== */

  contactText: {
    color: "#FFFFFF",
    fontSize: 9,
    lineHeight: 14,
  },

  bold: {
    fontWeight: "700",
  },

  /* =====================================================
     LINKS
  ===================================================== */

  linksContainer: {
    marginTop: 1,
  },

  linkRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 7,
  },

  linkIcon: {
    fontSize: 8,
    marginRight: 4,
  },

  linkText: {
    color: "#FFFFFF",
    fontSize: 9,
    flex: 1,
  },

  /* =====================================================
     LOGO
  ===================================================== */

  logoColumn: {
    flex: 1,
    paddingHorizontal: 5,

    alignItems: "center",
    justifyContent: "center",
  },

  wrapperContainer: {
    width: "100%",
    height: 100,

    alignItems: "center",
    justifyContent: "center",
  },

  wrapperImage: {
    width: 100,
    height: 90,
    position: "absolute",
  },

  emblem: {
    width: 65,
    height: 65,
  },
});
