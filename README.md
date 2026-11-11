# Bank Management System

Console banking management with account records, deposits, withdrawals and reports.

This repository contains the original files from a supplied collection, preserved without changing the source code.

## Contents

- `Turbo C++ DOS/ACCOUNT.DAT`
- `Turbo C++ DOS/BANK-MANAGEMENT-SYSTEM.CPP`
- `Visual C++ 2010/account.dat`
- `Visual C++ 2010/bank-management-system.cpp`

## Build notes

### Modern compiler variant
The file `Visual C++ 2010/bank-management-system.cpp` passed a **syntax-only C++17 compiler check** using `g++` in the packaging environment. To compile it with GCC:

```bash
g++ -std=c++17 "Visual C++ 2010/bank-management-system.cpp" -o app
./app
```

This is a compile check, **not** a functional test. Some programs write relative `.DAT` files; run them in an appropriate working directory.

## Notes

- The `.DAT` files (where present) are historical sample records included with the source, **not** Git LFS requirements. Review their contents before making this repo public.
- `.doc` files (where present) are archived output screenshots/examples, not modern documentation.
- Original author/contributor names and historical metadata may appear in the supplied files. No new ownership or open-source license is claimed. Check redistribution rights before public release.
- Code is provided as-is. No claims of production security or cross-platform compatibility.
