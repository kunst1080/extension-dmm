export type Book = {
  content_id: string;
  content_publish_date: Date;
  free_streaming_url: string;
  image_urls: {
    pl: string;
    ps: string;
    pt: string;
  };
  is_last_read: boolean;
  is_masked_image: boolean;
  is_read: boolean;
  // paper_publish_date: Date
  purchased: {
    appendix: string;
    download_url: string;
    remaining_time: string;
    streaming_url: string;
  };
  sell: {
    campaign_detail?: {
      campaign: Campaign;
    };
    campaign_price?: number;
    fixed_price: number;
    free_status: "paid";
  };
  status: {
    // is_antecedent: boolean;
    // is_monopoly: boolean;
    is_new_work: boolean;
    // is_repeal: boolean;
    // is_reservation: boolean;
  };
  tachiyomi_url: string;
  title: string;
  volume_number: number;
};

export type Campaign = {
  free: boolean;
  point: {
    begin: string;
    end: string;
    rate: number;
  };
  sales: {
    begin: string;
    end: string;
    rate: number;
  };
};
