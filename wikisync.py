import os
import igem_wikisync as sync

sync.run(
    team      = "UNSW_Australia",
    src_dir   = "_site",
    build_dir = "build"
)
