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

export type { DailyDiet, Diet };
