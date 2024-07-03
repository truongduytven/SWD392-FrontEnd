
 interface Station {
    ServiceName: string;
    Price: number;
  }
  
  interface Trip {
    UserName: string;
    Route: string;
    Company: string;
    Date: string;
    Ttime: string;
    Position: string;
  }
  
export interface ISearchTicket {
    Price: {
      Price: number;
      Services: Station[];
    };
    Trip: Trip;
    TotalBill: number;
    QrCodeImage: string;
    QrCode: string;
  }