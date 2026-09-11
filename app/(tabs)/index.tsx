// app/(tabs)/index.tsx

import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import InventoryHeader from '@/components/InventoryHeader';
import InventoryMetric from '@/components/InventoryMetric';
import InventoryAction from '@/components/InventoryAction';
import InventorySectionHeader from '@/components/InventorySectionHeader';
import StockItem from '@/components/StockItem';

import {
  COLORS,
  SPACING,
} from '@/constants/theme';

export default function InventoryDashboard() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <InventoryHeader
          title="Inventory"
          subtitle="Stock management dashboard"
        />

        <InventorySectionHeader title="Overview" />

        <View style={styles.metrics}>
          <InventoryMetric
            icon="cube-outline"
            label="ITEMS"
            value="248"
            note="Total products"
            iconBackground={COLORS.softBlue}
            iconColor={COLORS.primary}
          />

          <InventoryMetric
            icon="checkmark-circle-outline"
            label="IN STOCK"
            value="216"
            note="Available items"
            iconBackground={COLORS.softGreen}
            iconColor={COLORS.success}
          />

          <InventoryMetric
            icon="alert-circle-outline"
            label="LOW STOCK"
            value="18"
            note="Needs attention"
            iconBackground={COLORS.softOrange}
            iconColor={COLORS.warning}
          />
        </View>

        <InventorySectionHeader title="Quick Actions" />

        <View style={styles.actions}>
          <InventoryAction
            icon="add-circle-outline"
            title="Add Item"
            description="Create a new inventory item"
          />

          <InventoryAction
            icon="swap-horizontal-outline"
            title="Stock In"
            description="Record incoming stock"
          />

          <InventoryAction
            icon="remove-circle-outline"
            title="Stock Out"
            description="Record released stock"
          />
        </View>

        <InventorySectionHeader
          title="Stock Alerts"
          action="View All"
        />

        <StockItem
          icon="headset-outline"
          name="Wireless Headset"
          category="Electronics"
          quantity="4 units"
          status="Low Stock"
        />

        <StockItem
          icon="shirt-outline"
          name="Company Polo Shirt"
          category="Apparel"
          quantity="8 units"
          status="Low Stock"
        />

        <StockItem
          icon="print-outline"
          name="Printer Ink"
          category="Office Supplies"
          quantity="12 units"
          status="In Stock"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: SPACING.xl,
    paddingTop: 56,
    paddingBottom: SPACING.xxxl,
  },

  metrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.xxl,
  },

  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.xxl,
  },
});
