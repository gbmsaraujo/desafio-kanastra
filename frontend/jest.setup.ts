import "@testing-library/jest-dom";
import "text-encoding";
import "fast-text-encoding";

declare const global: any;

global.alert = jest.fn();
