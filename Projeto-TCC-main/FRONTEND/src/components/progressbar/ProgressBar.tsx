import React from 'react';
import { View } from 'react-native';

type ProgressBarProps = {
  percentage: number; // Ex: 0 até 100
};

export function ProgressBar({ percentage }: ProgressBarProps) {

  const safePercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <View className="w-full mb-5">
      <View className="h-2 bg-white w-full rounded-full">
        <View
          className="h-2 bg-blue-600 rounded-full"
          style={{ width: `${safePercentage}%` }}
        />
      </View>
    </View>
  );
}
