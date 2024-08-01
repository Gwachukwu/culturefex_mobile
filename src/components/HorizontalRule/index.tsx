import React from 'react';
import { View, StyleSheet, DimensionValue } from 'react-native';

interface HorizontalRuleProps {
  color?: string;
  thickness?: number;
  width?: DimensionValue;
  marginVertical?: number;
}

const HorizontalRule: React.FC<HorizontalRuleProps> = ({
  color = 'gray',
  thickness = 1,
  width = '100%',
  marginVertical = 10,
}) => {
  return (
    <View
      style={[
        styles.horizontalRule,
        {
          borderBottomColor: color,
          borderBottomWidth: thickness,
          width,
          marginVertical,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  horizontalRule: {
    alignSelf: 'center', // Center the line horizontally
  },
});

export default HorizontalRule;
