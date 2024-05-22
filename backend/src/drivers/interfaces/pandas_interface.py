from abc import ABC, abstractmethod
import pandas as pd


class IPandas(ABC):
    @abstractmethod
    def create_csv_dataframe(self, data) -> pd.DataFrame:
        pass