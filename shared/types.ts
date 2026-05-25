export interface FoodItem {
  name: string
  portion: string
  calories: number
  category: FoodCategory
  macros?: Macros
}

export interface Macros {
  protein: number
  carbs: number
  fat: number
  fiber?: number
}

export type FoodCategory =
  | 'protein'      // Meat, fish, eggs, tofu
  | 'grains'       // Rice, bread, pasta, noodles
  | 'vegetables'   // All vegetables
  | 'fruits'       // All fruits
  | 'dairy'        // Milk, cheese, yogurt
  | 'fats_oils'    // Oils, butter, nuts, seeds
  | 'beverages'    // Drinks, soups
  | 'snacks'       // Sweets, chips, desserts
  | 'condiments'   // Sauces, dressings, seasonings
  | 'mixed'        // Mixed dishes, combos

export interface HealthInsight {
  rating: 1 | 2 | 3 | 4 | 5
  label: 'Poor' | 'Fair' | 'Good' | 'Great' | 'Excellent'
  summary: string
  tips: string[]
}

export interface CalorieAnalysis {
  items: FoodItem[]
  totalCalories: number
  totalMacros: Macros
  confidence: 'high' | 'medium' | 'low'
  notes: string
  healthInsight: HealthInsight
}

export type AppPhase = 'camera' | 'preview' | 'analyzing' | 'results'

export interface ScanHistoryItem {
  id: string
  timestamp: number
  previewUrl: string
  analysis: CalorieAnalysis
}
