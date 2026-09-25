import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  
  StatusBar,
  Linking,
  Dimensions,
  Animated,
  Modal,
  Pressable,
  Image,
  FlatList,
  Easing,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert } from 'react-native';

import Footer from "./Footer";
import chalapathirao from "./assets/chalapathirao.png";
import apfdcllogo from "./assets/apfdcllogo.png";
import { useVideoPlayer, VideoView } from 'expo-video';
const videoSource = 'https://apfdcl.ap.gov.in/uploads/dashboard/baystaRlaunch.mp4';




const { width, height } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.78;

// ============ BASE URLS ============
const BASE_URL = "https://apfdcl.ap.gov.in/";
const GALLERY_BASE = "https://apfdcl.ap.gov.in/uploads/dashboard/images/gallery/";
const AWARDS_BASE = "https://apfdcl.ap.gov.in/uploads/dashboard/images/awards/";
const LEADERS_BASE = "https://apfdcl.ap.gov.in/uploads/dashboard/";

// ============ APFDCL DATA ============
const APFDCL_DATA = {
  name: "Andhra Pradesh Forest Development Corporation Limited",
  shortName: "APFDCL",
  tagline: "A Government of Andhra Pradesh Undertaking",
  established: "16 June 1975",
  authorizedCapital: "₹25 Crore",
  headquarters:
    "3rd Floor, P.V.S. Land Mark, Near APIIC Towers, Mangalagiri, Guntur District, AP - 522503",
  phone: "08645-297211 / 08645-297221",
  email: "vcmd_apfdc@yahoo.co.in / vcmd.apfdcl@gmail.com",
  website: "https://apfdcl.ap.gov.in/",
  aboutUs:
    "Andhra Pradesh Forest Development Corporation Limited (APFDCL) is a Government of Andhra Pradesh undertaking, functioning under the administrative control of the Environment, Forests, Science & Technology (E.F.S.&T.) Department. Established with the objective of raising plantations to meet the raw material requirements of wood-based industries, APFDCL is committed to the intensive development and scientific management of forest plantations.",
};

const PLANTATION_DATA = {
  species: [
    { name: "Eucalyptus (Seed Origin)", area: "12,734.20 Ha" },
    { name: "Eucalyptus (Clonal)", area: "44,197.06 Ha" },
    { name: "Bamboo", area: "10,559.47 Ha" },
    { name: "Cashew", area: "8,950.86 Ha" },
    { name: "Coffee", area: "4,010.00 Ha" },
    { name: "Teak", area: "929.32 Ha" },
    { name: "Medicinal Plants", area: "524.80 Ha" },
    { name: "Other Species", area: "317.78 Ha" },
  ],
  totalArea: "82,223.49 Ha",
};

const RED_SANDERS_AUCTION = {
  phase: "Phase XXI",
  quantity: "906 MT",
  totalPlanned: "5,376 MT",
  startDate: "February 28, 2025",
  cycles: ["Feb 28", "March 6", "March 13", "March 20"],
  grades: ["A", "B", "C"],
  platform: "MSTC Ltd (Global e-Tender cum e-Auction)",
  destination: "Global market, especially China (known as Zitan)",
};

// ============ LEADERS DATA ============
const LEADERS = [
  {
    name: "Sri Nara Chandrababu Naidu",
    position: "Hon'ble Chief Minister, Government Of Andhra Pradesh",
    image: `${LEADERS_BASE}cbn_img.png`,
    bgColor: "#194d33",
  },
  {
    name: "Sri Konidala Pawan Kalyan",
    position:
      "Hon'ble Deputy CM, Govt. Of AP. Minister for Environment Forests Science & Technology, Panchayati Raj, Rural Development & Rural Water Supply",
    image: `${LEADERS_BASE}dycm.jpg`,
    bgColor: "#c8232a",
  },
  {
    name: "Sri Ravu Venkata Sujay Krishna Ranga Rao",
    position:
      "Chairman Andhra Pradesh Forest Development Corporation Ltd.",
    image: `${LEADERS_BASE}chairaman.jpg`,
    bgColor: "#663399",
  },
  {
    name: "Sri Kantilal Dande, IAS",
    position:
      "Principal Secretary to Govt, Environment Forests Science and Technology",
    image: `${LEADERS_BASE}kantilaldande.jpeg`,
    bgColor: "#1E4D6B",
  },
  {
  name: "Dr. P.V. Chalapathi Rao, IFS",
  position:
    "Vice Chairman and Managing Director (FAC), Andhra Pradesh Forest Development Corporation Ltd.",
  image: chalapathirao,
  bgColor: "#2E8B57",
}
];

// ============ NOTIFICATIONS DATA ============
const NOTIFICATIONS = [
  
  {
    id: 18,
    title:
      "Welcome to APFDCL Mobile App",
    category: "Long Bamboo",
    upload:
      "",
    show_in_scroll: false,
  },
];

// ============ GALLERY DATA ============
const GALLERY_IMAGES = [
  { id: 1, src: `${GALLERY_BASE}1.jpg` },
  { id: 2, src: `${GALLERY_BASE}Eucalyptus.jpeg` },
  { id: 3, src: `${GALLERY_BASE}3.jpg` },
  { id: 4, src: `${GALLERY_BASE}4.jpg` },
  { id: 5, src: `${GALLERY_BASE}5.jpg` },
  { id: 6, src: `${GALLERY_BASE}6.jpg` },
  { id: 7, src: `${GALLERY_BASE}7.jpg` },
  { id: 8, src: `${GALLERY_BASE}8.jpg` },
];

// ============ AWARDS DATA ============
const AWARDS = [
  { id: 1, src: `${AWARDS_BASE}award1.png`, fallback: `${AWARDS_BASE}award1.jpg`, desc: "Award I" },
  { id: 6, src: `${AWARDS_BASE}award6.png`, fallback: `${AWARDS_BASE}award6.jpg`, desc: "Award VI" },
  { id: 8, src: `${AWARDS_BASE}award8.png`, fallback: `${AWARDS_BASE}award8.jpg`, desc: "Award VIII" },
  { id: 9, src: `${AWARDS_BASE}award9.png`, fallback: `${AWARDS_BASE}award9.jpg`, desc: "Award IX" },
  { id: 10, src: `${AWARDS_BASE}award10.png`, fallback: `${AWARDS_BASE}award10.jpg`, desc: "Award X" },
  { id: 11, src: `${AWARDS_BASE}award11.png`, fallback: `${AWARDS_BASE}award11.jpg`, desc: "Award XI" },
  { id: 12, src: `${AWARDS_BASE}award12.png`, fallback: `${AWARDS_BASE}award12.jpg`, desc: "Award XII" },
  { id: 13, src: `${AWARDS_BASE}award13.png`, fallback: `${AWARDS_BASE}award13.jpg`, desc: "Award XIII" },
  { id: 14, src: `${AWARDS_BASE}award14.png`, fallback: `${AWARDS_BASE}award14.jpg`, desc: "Award XIV" },
];

// ============ MENU DATA ============
const MENU_ITEMS = [
  { id: "Home", label: "Home", icon: "🏠", type: "tab", tab: "home" },

  {
    id: "About Us",
    label: "About Us",
    icon: "🏛️",
    children: [
      { id: "History", label: "History", type: "component" },
      { id: "Organogram", label: "Organogram", type: "component" },
      { id: "Vision and Mission", label: "Vision and Mission", type: "component" },
      { id: "Land Resources", label: "Land Resources", type: "component" },
      { id: "Contact Us", label: "Contact Us", type: "component" },
    ],
  },
  {
    id: "services",
    label: "Services",
    icon: "🛠️",
    children: [
      { id: "Consultancy", label: "Consultancy", type: "component" },
      { id: "Tenders", label: "Tenders & Auctions", type: "component" },
    ],
  },
  {
    id: "ACTS/CIRCULARS",
    label: "Acts / Circulars",
    icon: "📜",
    children: [
      { id: "RTI", label: "RTI", type: "component" },
      { id: "circulars", label: "Circulars", type: "component" },
    ],
  },
  {
    id: "Pramaan",
    label: "Pramaan Certification",
    icon: "🏅",
    children: [
      {
        id: "CoC MANAGER NOMINATION LETTER",
        label: "CoC Manager Nomination Letter",
        type: "pdf",
        url: `${BASE_URL}/files/images/ManagerNominationLetter.pdf`,
      },
      {
        id: "INTERNAL AUDIT CHECKLIST",
        label: "Internal Audit Checklist",
        type: "pdf",
        url: `${BASE_URL}/files/images/InetrnalAuditcheckList.pdf`,
      },
      {
        id: "ANNUAL PUBLIC SUMMARY REPORT",
        label: "Annual Public Summary Report",
        type: "pdf",
        url: `${BASE_URL}/files/images/AnnualPublicSummaryReport.pdf`,
      },
      {
        id: "CoC MANAGEMENT SYSTEM PROCEDURE MANUAL",
        label: "CoC Management System Procedure Manual",
        type: "pdf",
        url: `${BASE_URL}/files/images/COCManagementSystem.pdf`,
      },
    ],
  },
  { id: "Contact", label: "Contact", icon: "📞", type: "tab", tab: "contact" },
];

const TABS = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "about", label: "About", icon: "ℹ️" },
  { id: "projects", label: "Projects", icon: "🌳" },
  { id: "contact", label: "Contact", icon: "📞" },
];

// ============ HAMBURGER ============
function HamburgerIcon({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.hamburgerBtn}
      onPress={onPress}
      activeOpacity={0.7}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <View style={styles.hamburgerLine} />
      <View style={[styles.hamburgerLine, { width: 18 }]} />
      <View style={styles.hamburgerLine} />
    </TouchableOpacity>
  );
}

// ============ DRAWER ============
function Drawer({ visible, onClose, onNavigate }) {
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const toggleItem = (itemId) => {
    setExpandedItem((prev) => (prev === itemId ? null : itemId));
  };


const handlePress = async (item) => {
  // ✅ Home and Contact work normally
  if (item.type === "home") {
    onNavigate("Home");
    onClose();
    return;
  }

  if (item.type === "contact") {
    onNavigate("Contact");
    onClose();
    return;
  }

  // ⚠️ Everything else → Under Development alert
  if (item.children) {
    toggleItem(item.id); // expand/collapse still works
    return;
  }

  Alert.alert(
    "Under Development",
    `"${item.title || item.name || "This feature"}" is currently under development. Please check back later.`,
    [{ text: "OK" }]
  );
};

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.drawerRoot}>
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={[
            styles.drawerPanel,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <View style={styles.drawerHeader}>
            <View style={styles.drawerLogoCircle}>
              <Text style={styles.drawerLogoText}>🌲</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.drawerTitle}>APFDCL</Text>
              <Text style={styles.drawerSubtitle}>
                A.P Forest Development Corporation Limited
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} hitSlop={10}>
              <Text style={styles.drawerClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.drawerDivider} />

          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {MENU_ITEMS.map((item, index) => {
              const isExpanded = expandedItem === item.id;
              const isTab = item.type === "tab";
              return (
                <View key={item.id}>
                  {isTab && index > 0 && MENU_ITEMS[index - 1].children && (
                    <View style={styles.drawerSectionDivider} />
                  )}
                  <TouchableOpacity
                    style={styles.drawerItem}
                    activeOpacity={0.6}
                    onPress={() => handlePress(item)}
                  >
                    <Text style={styles.drawerItemIcon}>{item.icon}</Text>
                    <Text style={styles.drawerItemLabel}>{item.label}</Text>
                    {item.children && (
                      <Text style={styles.drawerChevron}>
                        {isExpanded ? "▼" : "▶"}
                      </Text>
                    )}
                  </TouchableOpacity>

                  {item.children && isExpanded && (
                    <View style={styles.drawerSubmenu}>
                      {item.children.map((child) => (
                        <TouchableOpacity
                          key={child.id}
                          style={styles.drawerSubItem}
                          activeOpacity={0.6}
                          onPress={() => handlePress(child)}
                        >
                          <Text style={styles.drawerSubBullet}>•</Text>
                          <Text style={styles.drawerSubLabel}>
                            {child.label}
                          </Text>
                          {child.type === "pdf" && (
                            <Text style={styles.drawerPdfIcon}>📄</Text>
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
            <View style={{ height: 30 }} />
          </ScrollView>

          <View style={styles.drawerFooter}>
            <Text style={styles.drawerFooterText}>
              © APFDCL · Government of Andhra Pradesh
            </Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen />;
      case "about":
        return <AboutScreen />;
      case "projects":
        return <ProjectsScreen />;
      case "contact":
        return <ContactScreen />;
      default:
        return <HomeScreen />;
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D3B0F" />

      <View style={styles.header}>
        <HamburgerIcon onPress={() => setDrawerOpen(true)} />
        <View style={styles.headerCenter}>
  <View style={styles.headerLogoRow}>
    <Image source={apfdcllogo} style={{ height: 30, width: 30 }} />
  </View>
  <Text style={styles.headerSubtitle}>
    A.P Forest Development Corporation Limited
  </Text>
</View>
        <TouchableOpacity
          style={styles.headerRightBtn}
          onPress={() => Linking.openURL("http://https://apfdcl.ap.gov.in/")}
          activeOpacity={0.7}
          hitSlop={10}
        >
       
        </TouchableOpacity>
      </View>

      

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {renderContent()}
         <Footer/>
      </ScrollView>


      <Drawer
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={(tab) => setActiveTab(tab)}
      />
    </SafeAreaView>
  );
}

// ============ HOME SCREEN ============
function HomeScreen() {
  const [galleryModal, setGalleryModal] = useState(null);
  const [awardModal, setAwardModal] = useState(null);

   const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View>
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          
          <Text style={styles.heroTitle}>{APFDCL_DATA.name}</Text>
           <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
          <View style={styles.heroDivider} />
        </View>
      </View>

      {/* ============ NOTIFICATIONS MARQUEE ============ */}
      <NotificationsMarquee />

      {/* ============ ABOUT US ============ */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionAccent} />
          <Text style={styles.sectionTitle}>About Us</Text>
        </View>
        <Text style={styles.bodyText}>{APFDCL_DATA.aboutUs}</Text>
      </View>

      {/* ============ LEADERS - VERTICAL COLUMN ============ */}
      <View style={styles.leadersSection}>
        <View style={styles.sectionHeaderStandalone}>
          <View style={styles.sectionAccent} />
          <Text style={styles.sectionTitle}>Our Leadership</Text>
        </View>
        <View style={styles.leadersColumn}>
          {LEADERS.map((leader, index) => (
            <View key={index} style={styles.leaderCardVertical}>
              <View style={styles.leaderImageWrapVertical}>
                <View style={styles.leaderImageBorderVertical}>
                  <Image
  source={
    typeof leader.image === "string"
      ? { uri: leader.image }
      : leader.image
  }
  style={styles.leaderImageVertical}
  resizeMode="cover"
/>
                </View>
                <View
                  style={[
                    styles.leaderAccentBar,
                    { backgroundColor: leader.bgColor },
                  ]}
                />
              </View>
              <View style={styles.leaderInfoVertical}>
                <Text style={styles.leaderNameVertical}>{leader.name}</Text>
                <View
                  style={[
                    styles.leaderNameDividerVertical,
                    { backgroundColor: leader.bgColor },
                  ]}
                />
                <Text style={styles.leaderPositionVertical}>
                  {leader.position}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* ============ RED SANDERS ============ */}
      {/* <View style={styles.highlightCard}>
        <View style={styles.highlightHeader}>
          <View style={styles.highlightIconWrap}>
            <Text style={styles.highlightIcon}>🪵</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.highlightTitle}>Red Sanders Global Auction</Text>
            <Text style={styles.highlightSubtitle}>
              Premium Grade Wood Export
            </Text>
          </View>
          <View style={styles.highlightLiveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
        <View style={styles.highlightGrid}>
          <View style={styles.highlightGridItem}>
            <Text style={styles.highlightGridLabel}>Phase</Text>
            <Text style={styles.highlightGridValue}>
              {RED_SANDERS_AUCTION.phase}
            </Text>
          </View>
          <View style={styles.highlightGridItem}>
            <Text style={styles.highlightGridLabel}>Quantity</Text>
            <Text style={styles.highlightGridValue}>
              {RED_SANDERS_AUCTION.quantity}
            </Text>
          </View>
          <View style={styles.highlightGridItem}>
            <Text style={styles.highlightGridLabel}>Start Date</Text>
            <Text style={styles.highlightGridValue}>
              {RED_SANDERS_AUCTION.startDate}
            </Text>
          </View>
          <View style={styles.highlightGridItem}>
            <Text style={styles.highlightGridLabel}>Grades</Text>
            <Text style={styles.highlightGridValue}>
              {RED_SANDERS_AUCTION.grades.join(", ")}
            </Text>
          </View>
        </View>
        <View style={styles.highlightFooter}>
          <Text style={styles.highlightNote}>
            Auction conducted through {RED_SANDERS_AUCTION.platform}
          </Text>
        </View>
      </View> */}

      {/* ============ GALLERY ============ */}
      <View style={styles.sectionHeaderStandalone}>
        <View style={styles.sectionAccent} />
        <Text style={styles.sectionTitle}>Gallery</Text>
      </View>
      <GalleryGrid onSelect={setGalleryModal} />

      {/* ============ AWARDS ============ */}
      <View style={styles.sectionHeaderStandalone}>
        <View style={styles.sectionAccent} />
        <Text style={styles.sectionTitle}>Awards</Text>
      </View>
      <AwardsGrid onSelect={setAwardModal} />

      {/* ============ KEY STATS ============ */}
      {/* <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionAccent} />
          <Text style={styles.sectionTitle}>Key Statistics</Text>
        </View>
        <View style={styles.statsGrid}>
          <StatCard value="82,223" label="Hectares Planted" icon="🌲" />
          <StatCard value="1975" label="Year Established" icon="📅" />
          <StatCard value="8" label="Major Species" icon="🌿" />
          <StatCard value="5,376 MT" label="Red Sanders Target" icon="🪵" />
        </View>
      </View> */}

      {/* ============ RECENT UPDATES ============ */}
      {/* <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionAccent} />
          <Text style={styles.sectionTitle}>Recent Updates</Text>
        </View>
        {NOTIFICATIONS.slice(0, 5).map((n) => (
          <UpdateCard
            key={n.id}
            date={n.category}
            title={n.title}
            description="Tap to open PDF"
            onPress={() => Linking.openURL(n.upload)}
          />
        ))}
      </View> */}

      {/* ============ GALLERY MODAL ============ */}
      <ImageModal
        visible={galleryModal !== null}
        images={GALLERY_IMAGES}
        index={galleryModal}
        onClose={() => setGalleryModal(null)}
        onIndexChange={setGalleryModal}
      />

      {/* ============ AWARD MODAL ============ */}
      <AwardModal
        visible={awardModal !== null}
        awards={AWARDS}
        index={awardModal}
        onClose={() => setAwardModal(null)}
        onIndexChange={setAwardModal}
      />
    </View>
  );
}

// ============ NOTIFICATIONS MARQUEE ============
function NotificationsMarquee() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const notices = NOTIFICATIONS;
  const loopItems = [...notices, ...notices];

  useEffect(() => {
    if (contentWidth === 0 || containerWidth === 0) return;

    scrollX.setValue(0);
    const duration = notices.length * 4000;

    const animation = Animated.loop(
      Animated.timing(scrollX, {
        toValue: -contentWidth,
        duration,
        useNativeDriver: true,
        easing: (t) => t,
      })
    );
    animation.start();

    return () => animation.stop();
  }, [contentWidth, containerWidth]);

  return (
    <View style={styles.marqueeContainer}>
      <View style={styles.marqueeBadgeRow}>
        <View style={styles.marqueeBadge}>
          <View style={styles.marqueeLiveDot} />
          <Text style={styles.marqueeBadgeText}>LATEST</Text>
        </View>
      </View>

      <View
        style={styles.marqueeViewport}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      >
        <Animated.View
          style={{
            flexDirection: "row",
            transform: [{ translateX: scrollX }],
          }}
        >
          <View
            style={{ flexDirection: "row" }}
            onLayout={(e) => setContentWidth(e.nativeEvent.layout.width)}
          >
            {loopItems.map((n, idx) => (
              <TouchableOpacity
                key={`${n.id}-${idx}`}
                style={styles.marqueeItem}
                activeOpacity={0.7}
                onPress={() => Linking.openURL(n.upload)}
              >
                <View style={styles.marqueeDotWrap}>
                  <Text style={styles.marqueeDot}>●</Text>
                </View>
                <Text style={styles.marqueeText} numberOfLines={1}>
                  {n.title}
                </Text>
                <View style={styles.marqueePdfWrap}>
                  <Text style={styles.marqueePdf}>📄</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

// ============ GALLERY GRID ============
function GalleryGrid({ onSelect }) {
  return (
    <View style={styles.galleryGrid}>
      {GALLERY_IMAGES.map((img, idx) => (
        <TouchableOpacity
          key={img.id}
          style={styles.galleryItem}
          activeOpacity={0.8}
          onPress={() => onSelect(idx)}
        >
          <Image
            source={{ uri: img.src }}
            style={styles.galleryImage}
            resizeMode="cover"
          />
          <View style={styles.galleryOverlay}>
            <Text style={styles.galleryOverlayIcon}>🔍</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ============ AWARDS GRID ============
function AwardsGrid({ onSelect }) {
  return (
    <View style={styles.awardsGrid}>
      {AWARDS.map((award, idx) => (
        <TouchableOpacity
          key={award.id}
          style={styles.awardCard}
          activeOpacity={0.8}
          onPress={() => onSelect(idx)}
        >
          <View style={styles.awardImageWrap}>
            <Image
              source={{ uri: award.src }}
              style={styles.awardImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.awardDesc}>{award.desc}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ============ IMAGE MODAL (Gallery) ============
function ImageModal({ visible, images, index, onClose, onIndexChange }) {
  if (!visible || index === null || !images[index]) return null;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <TouchableOpacity
          style={styles.modalPrev}
          onPress={() =>
            onIndexChange((index - 1 + images.length) % images.length)
          }
        >
          <Text style={styles.modalNavText}>◀</Text>
        </TouchableOpacity>

        <Image
          source={{ uri: images[index].src }}
          style={styles.modalImage}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.modalNext}
          onPress={() => onIndexChange((index + 1) % images.length)}
        >
          <Text style={styles.modalNavText}>▶</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalClose} onPress={onClose}>
          <Text style={styles.modalCloseText}>✕</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

// ============ AWARD MODAL ============
function AwardModal({ visible, awards, index, onClose, onIndexChange }) {
  if (!visible || index === null || !awards[index]) return null;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <TouchableOpacity
          style={styles.modalPrev}
          onPress={() =>
            onIndexChange((index - 1 + awards.length) % awards.length)
          }
        >
          <Text style={styles.modalNavText}>◀</Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: awards[index].src }}
            style={styles.modalImage}
            resizeMode="contain"
          />
          <Text style={styles.modalAwardDesc}>{awards[index].desc}</Text>
        </View>

        <TouchableOpacity
          style={styles.modalNext}
          onPress={() => onIndexChange((index + 1) % awards.length)}
        >
          <Text style={styles.modalNavText}>▶</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalClose} onPress={onClose}>
          <Text style={styles.modalCloseText}>✕</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

// ============ ABOUT SCREEN ============
function AboutScreen() {
  return (
    <View>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>About APFDCL</Text>
        <Text style={styles.pageSubtitle}>Our History & Mission</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionAccent} />
          <Text style={styles.sectionTitle}>Corporate Profile</Text>
        </View>
        <InfoRow label="Full Name" value={APFDCL_DATA.name} />
        <InfoRow label="Short Name" value={APFDCL_DATA.shortName} />
        <InfoRow label="Established" value={APFDCL_DATA.established} />
        <InfoRow
          label="Authorized Capital"
          value={APFDCL_DATA.authorizedCapital}
        />
        <InfoRow label="Type" value="Wholly Owned Government Company" />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionAccent} />
          <Text style={styles.sectionTitle}>About Us</Text>
        </View>
        <Text style={styles.bodyText}>{APFDCL_DATA.aboutUs}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionAccent} />
          <Text style={styles.sectionTitle}>Core Activities</Text>
        </View>
        <ActivityCard
          icon="🌱"
          title="Forest Plantations"
          description="Raising plantations of eucalyptus, bamboo, cashew, coffee, teak, and medicinal plants"
        />
        <ActivityCard
          icon="🪵"
          title="Red Sanders Sales"
          description="Global e-auctions of red sanders wood through MSTC Ltd with export permissions"
        />
        <ActivityCard
          icon="🏭"
          title="Industrial Supply"
          description="Supplying pulpwood, timber, and bamboo to forest-based industries"
        />
        <ActivityCard
          icon="🌍"
          title="Eco-Tourism"
          description="Development of eco-parks and nature-based tourism facilities"
        />
      </View>
    </View>
  );
}

// ============ PROJECTS SCREEN ============
function ProjectsScreen() {
  return (
    <View>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Projects & Plantations</Text>
        <Text style={styles.pageSubtitle}>Our Green Initiatives</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionAccent} />
          <Text style={styles.sectionTitle}>Plantation Area by Species</Text>
        </View>
        <Text style={styles.sectionNote}>
          As of March 2013 (Latest Available Data)
        </Text>

        {PLANTATION_DATA.species.map((item, index) => (
          <View key={index} style={styles.plantationRow}>
            <View style={styles.plantationInfo}>
              <Text style={styles.plantationName}>{item.name}</Text>
              <Text style={styles.plantationArea}>{item.area}</Text>
            </View>
            <View style={styles.plantationBarContainer}>
              <View
                style={[
                  styles.plantationBar,
                  {
                    width: `${Math.min(
                      100,
                      (parseFloat(item.area.replace(/,/g, "")) / 50000) * 100
                    )}%`,
                    backgroundColor: getSpeciesColor(index),
                  },
                ]}
              />
            </View>
          </View>
        ))}

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Plantation Area</Text>
          <Text style={styles.totalValue}>{PLANTATION_DATA.totalArea}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionAccent} />
          <Text style={styles.sectionTitle}>Current Projects</Text>
        </View>
        <ProjectCard
          title="Phase XXI Red Sanders Auction"
          status="Ongoing"
          description={`Global e-auction of ${RED_SANDERS_AUCTION.quantity} of red sanders wood in grades A, B, C.`}
          details={[
            `Cycles: ${RED_SANDERS_AUCTION.cycles.join(", ")}`,
            `Platform: ${RED_SANDERS_AUCTION.platform}`,
          ]}
        />
        <ProjectCard
          title="Eucalyptus & Pulpwood Development"
          status="Ongoing"
          description="Large-scale plantation of eucalyptus for pulpwood and timber production."
          details={[
            "Seed origin: 12,734 Ha",
            "Clonal: 44,197 Ha",
            "Main species for paper industry",
          ]}
        />
        <ProjectCard
          title="Bamboo Plantation Program"
          status="Ongoing"
          description="Development of bamboo plantations in Rajahmundry and Eluru divisions."
          details={[
            "Total area: 10,559 Ha",
            "Rajahmundry & Eluru Divisions",
          ]}
        />
      </View>
    </View>
  );
}

// ============ CONTACT SCREEN ============
function ContactScreen() {
  const handleCall = () => {
    Linking.openURL(`tel:${APFDCL_DATA.phone.split(" / ")[0]}`);
  };
  const handleEmail = () => {
    Linking.openURL(`mailto:${APFDCL_DATA.email.split(" / ")[0]}`);
  };
  const handleWebsite = () => {
    Linking.openURL("http://https://apfdcl.ap.gov.in/");
  };

  return (
    <View>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Contact Us</Text>
        <Text style={styles.pageSubtitle}>Get in Touch with APFDCL</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionAccent} />
          <Text style={styles.sectionTitle}>Head Office</Text>
        </View>
        <View style={styles.contactCard}>
          <View style={styles.contactRow}>
            <View style={styles.contactIconWrap}>
              <Text style={styles.contactIcon}>📍</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Address</Text>
              <Text style={styles.contactValue}>
                {APFDCL_DATA.headquarters}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.contactRow} onPress={handleCall}>
            <View style={styles.contactIconWrap}>
              <Text style={styles.contactIcon}>📞</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>{APFDCL_DATA.phone}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactRow} onPress={handleEmail}>
            <View style={styles.contactIconWrap}>
              <Text style={styles.contactIcon}>✉️</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>{APFDCL_DATA.email}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactRow} onPress={handleWebsite}>
            <View style={styles.contactIconWrap}>
              <Text style={styles.contactIcon}>🌐</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Website</Text>
              <Text style={styles.contactValue}>{APFDCL_DATA.website}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionAccent} />
          <Text style={styles.sectionTitle}>Official Website</Text>
        </View>
        <TouchableOpacity style={styles.websiteButton} onPress={handleWebsite}>
          <Text style={styles.websiteButtonText}>Visit https://apfdcl.ap.gov.in/</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ============ REUSABLE COMPONENTS ============
function StatCard({ value, label, icon }) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statIconWrap}>
        <Text style={styles.statIcon}>{icon}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function UpdateCard({ date, title, description, onPress }) {
  return (
    <TouchableOpacity
      style={styles.updateCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.updateHeader}>
        <View style={styles.updateDateBadge}>
          <Text style={styles.updateDate}>{date}</Text>
        </View>
        <Text style={styles.updateTitle} numberOfLines={2}>
          {title}
        </Text>
      </View>
      <View style={styles.updateFooter}>
        <Text style={styles.updateDescription}>{description}</Text>
        <Text style={styles.updateArrow}>→</Text>
      </View>
    </TouchableOpacity>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function ActivityCard({ icon, title, description }) {
  return (
    <View style={styles.activityCard}>
      <View style={styles.activityIconWrap}>
        <Text style={styles.activityIcon}>{icon}</Text>
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activityDescription}>{description}</Text>
      </View>
    </View>
  );
}

function ProjectCard({ title, status, description, details }) {
  return (
    <View style={styles.projectCard}>
      <View style={styles.projectHeader}>
        <Text style={styles.projectTitle}>{title}</Text>
        <View
          style={[
            styles.statusBadge,
            status === "Ongoing"
              ? styles.statusOngoing
              : styles.statusMaintenance,
          ]}
        >
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      <Text style={styles.projectDescription}>{description}</Text>
      {details.map((detail, index) => (
        <View key={index} style={styles.projectDetailRow}>
          <Text style={styles.projectBullet}>•</Text>
          <Text style={styles.projectDetailText}>{detail}</Text>
        </View>
      ))}
    </View>
  );
}

function getSpeciesColor(index) {
  const colors = [
    "#1B5E20",
    "#2E7D32",
    "#388E3C",
    "#43A047",
    "#4CAF50",
    "#66BB6A",
    "#81C784",
    "#A5D6A7",
  ];
  return colors[index % colors.length];
}

// ============ STYLES ============
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
   video: {
    width: "100%",
    height: 200,
    padding:0,
    margin:0
  },

  // Header
  header: {
    backgroundColor: "#0D3B0F",
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderBottomWidth: 3,
    borderBottomColor: "#F9A825",
  },
  hamburgerBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 4,
  },
  hamburgerLine: {
    width: 24,
    height: 2.5,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    marginVertical: 2.5,
  },
  headerCenter: { flex: 1, alignItems: "center" },
  headerLogoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerLogo: { fontSize: 18 },
  headerTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 2.5,
  },
  headerSubtitle: { fontSize: 10, color: "#A5D6A7", marginTop: 2, letterSpacing: 0.5 },
  headerRightBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerRightIcon: { fontSize: 20 },

  // Drawer
  drawerRoot: { flex: 1, flexDirection: "row" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  drawerPanel: {
    width: DRAWER_WIDTH,
    backgroundColor: "#FFFFFF",
    height: "100%",
    elevation: 24,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  drawerHeader: {
    backgroundColor: "#0D3B0F",
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  drawerLogoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1B5E20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#F9A825",
  },
  drawerLogoText: { fontSize: 24 },
  drawerTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 1.5,
  },
  drawerSubtitle: { fontSize: 10, color: "#A5D6A7", marginTop: 2 },
  drawerClose: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    paddingHorizontal: 6,
  },
  drawerDivider: { height: 3, backgroundColor: "#F9A825" },
  drawerSectionDivider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 6,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  drawerItemIcon: {
    fontSize: 18,
    marginRight: 14,
    width: 24,
    textAlign: "center",
  },
  drawerItemLabel: {
    flex: 1,
    fontSize: 14,
    color: "#212121",
    fontWeight: "600",
  },
  drawerChevron: { fontSize: 10, color: "#757575" },
  drawerSubmenu: {
    backgroundColor: "#F7FBF5",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#E8F5E9",
  },
  drawerSubItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  drawerSubBullet: { fontSize: 14, color: "#2E7D32", marginRight: 8 },
  drawerSubLabel: { flex: 1, fontSize: 13, color: "#33691E" },
  drawerPdfIcon: { fontSize: 12, marginLeft: 6 },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#FAFAFA",
  },
  drawerFooterText: {
    fontSize: 10,
    color: "#9E9E9E",
    textAlign: "center",
  },

  content: { flex: 1 },

  // Tab Bar
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    paddingBottom: 8,
    paddingTop: 6,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  tabItem: { flex: 1, alignItems: "center", paddingVertical: 2 },
  tabItemActive: {},
  tabIconWrap: {
    width: 36,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  tabIconWrapActive: {
    backgroundColor: "#E8F5E9",
  },
  tabIcon: { fontSize: 18 },
  tabLabel: { fontSize: 11, color: "#9E9E9E" },
  tabLabelActive: { color: "#0D3B0F", fontWeight: "bold" },

  // ============ HERO ============
  hero: {
    backgroundColor: "#0D3B0F",
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 28,
    position: "relative",
    overflow: "hidden",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#1B5E20",
    opacity: 0.3,
  },
  heroContent: {
    zIndex: 1,
    alignItems: "center",
  },
  heroBadgeTop: {
    backgroundColor: "rgba(249, 168, 37, 0.2)",
    borderWidth: 1,
    borderColor: "#F9A825",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 16,
  },
  heroBadgeTopText: {
    color: "#F9A825",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 28,
  },
  heroDivider: {
    width: 60,
    height: 3,
    backgroundColor: "#F9A825",
    borderRadius: 2,
    marginVertical: 14,
  },
  heroTagline: {
    fontSize: 13,
    color: "#A5D6A7",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  heroStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "space-around",
  },
  heroStat: { alignItems: "center" },
  heroStatValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F9A825",
  },
  heroStatLabel: {
    fontSize: 10,
    color: "#A5D6A7",
    marginTop: 2,
    letterSpacing: 0.5,
  },
  heroStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  // Sections
  section: {
    backgroundColor: "#FFFFFF",
    marginTop: 14,
    padding: 18,
    marginHorizontal: 14,
    borderRadius: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionHeaderStandalone: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 8,
    paddingHorizontal: 18,
  },
  sectionAccent: {
    width: 4,
    height: 22,
    backgroundColor: "#F9A825",
    borderRadius: 2,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0D3B0F",
  },
  sectionNote: {
    fontSize: 11,
    color: "#9E9E9E",
    marginBottom: 12,
    fontStyle: "italic",
  },
  bodyText: { fontSize: 14, color: "#424242", lineHeight: 23 },

  // ============ MARQUEE ============
  marqueeContainer: {
    backgroundColor: "#FFFBF0",
    marginTop: 0,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#FFE0B2",
  },
  marqueeBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  marqueeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E65100",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 5,
  },
  marqueeLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
  },
  marqueeBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },
  marqueeTapHint: {
    fontSize: 10,
    color: "#8D6E63",
    marginLeft: 10,
    fontStyle: "italic",
  },
  marqueeViewport: {
    overflow: "hidden",
    height: 30,
  },
  marqueeItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 30,
  },
  marqueeDotWrap: {
    marginRight: 8,
  },
  marqueeDot: { color: "#E65100", fontSize: 7 },
  marqueeText: {
    color: "#5D4037",
    fontSize: 13,
    fontWeight: "500",
  },
  marqueePdfWrap: {
    marginLeft: 8,
  },
  marqueePdf: { fontSize: 12 },

  // ============ LEADERS (VERTICAL COLUMN) ============
  leadersSection: {
    marginTop: 18,
  },
  leadersColumn: {
    paddingHorizontal: 14,
    gap: 12,
  },
  leaderCardVertical: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  leaderImageWrapVertical: {
    width: 110,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    position: "relative",
  },
  leaderImageBorderVertical: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#F9A825",
    overflow: "hidden",
    backgroundColor: "#E0E0E0",
  },
  leaderImageVertical: {
    width: "100%",
    height: "100%",
  },
  leaderAccentBar: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  leaderInfoVertical: {
    flex: 1,
    padding: 14,
    justifyContent: "center",
  },
  leaderNameVertical: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0D3B0F",
    marginBottom: 6,
    lineHeight: 19,
  },
  leaderNameDividerVertical: {
    width: 32,
    height: 2,
    borderRadius: 1,
    marginBottom: 8,
    opacity: 0.8,
  },
  leaderPositionVertical: {
    fontSize: 11,
    color: "#616161",
    lineHeight: 16,
  },

  // ============ GALLERY ============
  galleryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    marginTop: 4,
  },
  galleryItem: {
    width: (width - 36) / 2,
    height: 140,
    margin: 4,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#E0E0E0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  galleryImage: { width: "100%", height: "100%" },
  galleryOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderTopLeftRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  galleryOverlayIcon: { fontSize: 12 },

  // ============ AWARDS ============
  awardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    marginTop: 4,
    justifyContent: "space-between",
  },
  awardCard: {
    width: (width - 52) / 3,
    marginVertical: 6,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  awardImageWrap: {
    width: "100%",
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  awardImage: { width: "100%", height: "100%" },
  awardDesc: {
    fontSize: 10,
    color: "#424242",
    marginTop: 8,
    textAlign: "center",
    fontWeight: "500",
  },

  // ============ MODALS ============
  modalRoot: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: width * 0.85,
    height: height * 0.6,
    borderRadius: 12,
  },
  modalNavText: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
  },
  modalPrev: {
    position: "absolute",
    left: 12,
    top: "50%",
    marginTop: -20,
    padding: 12,
    zIndex: 10,
  },
  modalNext: {
    position: "absolute",
    right: 12,
    top: "50%",
    marginTop: -20,
    padding: 12,
    zIndex: 10,
  },
  modalClose: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
    zIndex: 10,
  },
  modalCloseText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
  },
  modalAwardDesc: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 12,
    fontWeight: "600",
  },

  // ============ HIGHLIGHT CARD (Red Sanders) ============
  highlightCard: {
    backgroundColor: "#FFFFFF",
    marginTop: 14,
    marginHorizontal: 14,
    padding: 0,
    borderRadius: 14,
    borderLeftWidth: 5,
    borderLeftColor: "#F9A825",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: "hidden",
  },
  highlightHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF8E1",
    borderBottomWidth: 1,
    borderBottomColor: "#FFE0B2",
  },
  highlightIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFF3E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  highlightIcon: { fontSize: 22 },
  highlightTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#E65100",
  },
  highlightSubtitle: {
    fontSize: 11,
    color: "#8D6E63",
    marginTop: 2,
  },
  highlightLiveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E65100",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#FFFFFF",
  },
  liveText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  highlightGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 12,
  },
  highlightGridItem: {
    width: "50%",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  highlightGridLabel: {
    fontSize: 11,
    color: "#9E9E9E",
    marginBottom: 3,
  },
  highlightGridValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#212121",
  },
  highlightFooter: {
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  highlightNote: {
    fontSize: 11,
    color: "#8D6E63",
    fontStyle: "italic",
    lineHeight: 16,
  },

  // ============ STATS ============
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    backgroundColor: "#F1F8E9",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E8F5E9",
  },
  statIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statIcon: { fontSize: 22 },
  statValue: { fontSize: 20, fontWeight: "bold", color: "#1B5E20" },
  statLabel: {
    fontSize: 11,
    color: "#558B2F",
    textAlign: "center",
    marginTop: 4,
    lineHeight: 15,
  },

  // ============ UPDATE CARD ============
  updateCard: {
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  updateHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  updateDateBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 10,
  },
  updateDate: {
    fontSize: 10,
    color: "#2E7D32",
    fontWeight: "600",
  },
  updateTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#212121",
    flex: 1,
    lineHeight: 18,
  },
  updateFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  updateDescription: {
    fontSize: 12,
    color: "#757575",
    lineHeight: 18,
    flex: 1,
  },
  updateArrow: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "bold",
    marginLeft: 8,
  },

  // Page header
  pageHeader: {
    backgroundColor: "#0D3B0F",
    padding: 28,
    alignItems: "center",
  },
  pageTitle: { fontSize: 22, fontWeight: "bold", color: "#FFFFFF" },
  pageSubtitle: { fontSize: 13, color: "#A5D6A7", marginTop: 6 },

  // Info Row
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  infoLabel: { fontSize: 13, color: "#9E9E9E", flex: 1 },
  infoValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#212121",
    flex: 2,
    textAlign: "right",
  },

  // Activity card
  activityCard: {
    flexDirection: "row",
    backgroundColor: "#F9FBE7",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F0F4C3",
  },
  activityIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityIcon: { fontSize: 20 },
  activityContent: { flex: 1 },
  activityTitle: { fontSize: 14, fontWeight: "600", color: "#33691E" },
  activityDescription: {
    fontSize: 12,
    color: "#558B2F",
    marginTop: 4,
    lineHeight: 18,
  },

  // Plantation
  plantationRow: { marginBottom: 14 },
  plantationInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  plantationName: { fontSize: 13, color: "#424242" },
  plantationArea: { fontSize: 12, fontWeight: "600", color: "#1B5E20" },
  plantationBarContainer: {
    height: 8,
    backgroundColor: "#EEEEEE",
    borderRadius: 4,
    overflow: "hidden",
  },
  plantationBar: { height: "100%", borderRadius: 4 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 2,
    borderTopColor: "#1B5E20",
  },
  totalLabel: { fontSize: 14, fontWeight: "bold", color: "#1B5E20" },
  totalValue: { fontSize: 14, fontWeight: "bold", color: "#1B5E20" },

  // Project card
  projectCard: {
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#212121",
    flex: 1,
  },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusOngoing: { backgroundColor: "#C8E6C9" },
  statusMaintenance: { backgroundColor: "#FFF9C4" },
  statusText: { fontSize: 10, fontWeight: "700", color: "#33691E" },
  projectDescription: {
    fontSize: 12,
    color: "#616161",
    lineHeight: 18,
    marginBottom: 10,
  },
  projectDetailRow: { flexDirection: "row", marginBottom: 5 },
  projectBullet: { fontSize: 12, color: "#4CAF50", marginRight: 8, fontWeight: "bold" },
  projectDetailText: { fontSize: 12, color: "#757575", flex: 1 },

  // Contact
  contactCard: { backgroundColor: "#FAFAFA", borderRadius: 10, padding: 4 },
  contactRow: {
    flexDirection: "row",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    alignItems: "flex-start",
  },
  contactIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contactIcon: { fontSize: 18 },
  contactInfo: { flex: 1 },
  contactLabel: { fontSize: 11, color: "#9E9E9E", marginBottom: 3 },
  contactValue: { fontSize: 13, color: "#212121", lineHeight: 19 },

  // Website button
  websiteButton: {
    backgroundColor: "#0D3B0F",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  websiteButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold", letterSpacing: 0.5 },
});