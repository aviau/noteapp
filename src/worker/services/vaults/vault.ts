export class Vault {
  private readonly path: string;

  constructor(path: string) {
    this.path = path;
  }

  async getFiles(): Promise<string[]> {
    return [
      'journals/day1.md',
      'pages/meetings/alex.md',
      'pages/meetings/fidji.md',
      'pages/how-to-take-nodes.md',
    ];
  }
}
