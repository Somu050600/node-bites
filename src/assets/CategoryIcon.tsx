export const CategoryIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#ffffff"}
    fill={"none"}
    {...props}
  >
    <rect width="100" height="100" x="0" y="0" fill="red" />
    <g transform="scale(0.8) translate(3, 3)">
      <path
        d="M3 21L17 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.69577 17.3042C4.5632 15.1717 3.85234 11.6174 8.11749 7.3522C13.4489 2.02076 20.913 3.08704 20.913 3.08704C20.913 3.08704 21.9792 10.5511 16.6478 15.8825C14.1373 18.3931 11.873 19.1796 10 18.9669"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
