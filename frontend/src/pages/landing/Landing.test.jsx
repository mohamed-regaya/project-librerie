import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";
import LibraryLanding from "./Landing.jsx";

// ✅ Mock NavMenu (avoid dependency issues)
vi.mock("../../components/CategoryMenu", () => ({
  default: () => <div data-testid="nav-menu">NavMenu</div>,
}));

// ✅ Mock productServices
vi.mock("../../services/productServices", () => ({
  default: {
    handleGetAllProducts: vi.fn(),
  },
}));

// ✅ Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import productServices from "../../services/productServices";

const mockProducts = [
  {
    _id: "1",
    name: "Product 1",
    image: "img1.png",
  },
  {
    _id: "2",
    name: "Product 2",
    image: "img2.png",
  },
];

describe("LibraryLanding Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays products after fetch", async () => {
    productServices.handleGetAllProducts.mockResolvedValue(mockProducts);

    render(
      <MemoryRouter>
        <LibraryLanding />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getAllByRole("img").length).toBeGreaterThan(0);
    });
  });

  it("navigates to product page on click", async () => {
    productServices.handleGetAllProducts.mockResolvedValue(mockProducts);

    render(
      <MemoryRouter>
        <LibraryLanding />
      </MemoryRouter>,
    );

    const images = await screen.findAllByRole("img");

    fireEvent.click(images[1]);

    expect(mockNavigate).toHaveBeenCalledWith("/product_info/1");
  });
});
