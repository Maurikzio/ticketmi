import { closest } from "fastest-levenshtein"

export const getActivePath = (path: string, paths: string[], ignoredPaths?: string[]) => {
  const closestPath = closest(path, paths.concat(ignoredPaths || []));
  const index = paths.indexOf(closestPath)
  return { active: closestPath, activeIndex: index };
}
