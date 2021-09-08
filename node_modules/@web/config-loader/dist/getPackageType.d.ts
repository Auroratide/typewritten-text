export = getPackageType;
/**
 * Gets the package type for a given directory. Walks up the file system, looking
 * for a package.json file and returns the package type.
 * @param {string} basedir
 * @returns {Promise<string>}
 */
declare function getPackageType(basedir: string): Promise<string>;
//# sourceMappingURL=getPackageType.d.ts.map