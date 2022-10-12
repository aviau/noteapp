export enum PathName {
  HOME = "",
  PAGES = "pages",
}

export type PathAndParams =
  | {
      path: PathName.HOME;
      params?: undefined;
    }
  | {
      path: PathName.PAGES;
      params?: {
        filepath?: string;
      };
    };

export function pathFor({ path, params }: PathAndParams): string {
    const paramsEncoder = new URLSearchParams();
    if (params !== undefined) {
        Object.entries(params).forEach(([name, param]) => {
            if (param !== undefined) {
                paramsEncoder.append(name, param);
            }
        });
    }
    return `/${path}?${paramsEncoder.toString()}`;
}
