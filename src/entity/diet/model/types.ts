interface DailyDiet {
  dietId: number;
  dietFiles: Diet[];
}

interface Diet {
  id: number;
  fileName: string;
  originalName: string;
  extension: '.jpg' | '.png';
  fileSize: number;
  fileUrl: string;
  type: 'BREAKFAST' | 'LUNCH' | 'DINNER';
}

interface RegisterAndEditDiet {
  breakfastFile: string | null;
  lunchFile: string | null;
  dinnerFile: string | null;
  breakfastFast: boolean;
  lunchFast: boolean;
  dinnerFast: boolean;
  eatDate?: string;
}
export type { DailyDiet, Diet, RegisterAndEditDiet };
